import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Bool "mo:core/Bool";
import List "mo:core/List";

actor {
  include MixinStorage();

  type ShoeListing = {
    id : Nat;
    seller : Principal;
    name : Text;
    priceCents : Nat;
    conditionScore : Nat;
    isAuthentic : Bool;
    photo : Storage.ExternalBlob;
  };

  var nextListingId = 0;
  let listingList = List.empty<ShoeListing>();
  let userCollections = List.empty<(Principal, List.List<ShoeListing>)>();
  let userRatings = List.empty<(Principal, (Nat, Nat))>();

  module ShoeListing {
    public func compare(a : ShoeListing, b : ShoeListing) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  public shared ({ caller }) func createListing(
    name : Text,
    priceCents : Nat,
    photo : Storage.ExternalBlob,
    conditionScore : Nat,
    isAuthentic : Bool,
  ) : async Nat {
    let listingId = nextListingId;
    nextListingId += 1;

    let listing : ShoeListing = {
      id = listingId;
      seller = caller;
      name;
      priceCents;
      conditionScore;
      isAuthentic;
      photo;
    };

    listingList.add(listing);

    let userCollection = switch (userCollections.find(func((id, _)) { id == caller })) {
      case (?(_, collection)) { collection };
      case (null) { List.empty<ShoeListing>() };
    };
    userCollection.add(listing);

    let updatedCollections = userCollections.filter(func((id, _)) { id != caller });
    updatedCollections.add((caller, userCollection));
    userCollections.clear();
    userCollections.addAll(updatedCollections.values());
    userCollections.add((caller, userCollection));

    listingId;
  };

  public shared ({ caller }) func getListings(
    minCondition : Nat,
    maxCondition : Nat,
    filterAuthenticOnly : Bool,
  ) : async [ShoeListing] {
    let filtered = listingList.filter(
      func(listing) {
        listing.conditionScore >= minCondition and
        listing.conditionScore <= maxCondition and
        (not filterAuthenticOnly or listing.isAuthentic)
      }
    );
    filtered.toArray().sort();
  };

  public shared ({ caller }) func getUserProfile(user : Principal) : async {
    collection : [ShoeListing];
    tradeCount : Nat;
    averageRating : Float;
  } {
    let collection = switch (userCollections.find(func((id, _)) { id == user })) {
      case (?(_, c)) { c };
      case (null) { List.empty<ShoeListing>() };
    };

    let (completedTrades, ratingSum) = switch (userRatings.find(func((id, _)) { id == user })) {
      case (?(_, tuple)) { tuple };
      case (null) { (0, 0) };
    };
    let averageRating = if (completedTrades == 0) { 0.0 } else { ratingSum.toFloat() / completedTrades.toFloat() };

    {
      collection = collection.toArray();
      tradeCount = completedTrades;
      averageRating;
    };
  };

  public shared ({ caller }) func completeTrade(seller : Principal, buyer : Principal, sellerRating : Nat, buyerRating : Nat) : async () {
    let (sellerTrades, sellerRatingSum) = switch (userRatings.find(func((id, _)) { id == seller })) {
      case (?(_, tuple)) { tuple };
      case (null) { (0, 0) };
    };
    let updatedSellerRatings = userRatings.filter(func((id, _)) { id != seller });
    updatedSellerRatings.add((seller, (sellerTrades + 1, sellerRatingSum + sellerRating)));
    userRatings.clear();
    userRatings.addAll(updatedSellerRatings.values());
    userRatings.add((seller, (sellerTrades + 1, sellerRatingSum + sellerRating)));

    let (buyerTrades, buyerRatingSum) = switch (userRatings.find(func((id, _)) { id == buyer })) {
      case (?(_, tuple)) { tuple };
      case (null) { (0, 0) };
    };
    let updatedBuyerRatings = userRatings.filter(func((id, _)) { id != buyer });
    updatedBuyerRatings.add((buyer, (buyerTrades + 1, buyerRatingSum + buyerRating)));
    userRatings.clear();
    userRatings.addAll(updatedBuyerRatings.values());
    userRatings.add((buyer, (buyerTrades + 1, buyerRatingSum + buyerRating)));
  };
};
