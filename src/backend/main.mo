import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Order "mo:core/Order";

actor {
  type Demand = {
    name : Text;
    phone : Text;
    location : Text;
    need : Text;
    timing : Text;
    budget : ?Text;
    consent : Bool;
    timestamp : Int;
  };

  module Demand {
    public func compare(demand1 : Demand, demand2 : Demand) : Order.Order {
      Text.compare(demand1.need, demand2.need);
    };
  };

  type Provider = {
    businessName : Text;
    phone : Text;
    city : Text;
    categories : [Text];
    serviceAreas : Text;
    consent : Bool;
    timestamp : Int;
  };

  module Provider {
    public func compare(provider1 : Provider, provider2 : Provider) : Order.Order {
      Text.compare(provider1.businessName, provider2.businessName);
    };
  };

  var demandId = 0;
  var providerId = 0;

  let demands = Map.empty<Nat, Demand>();
  let providers = Map.empty<Nat, Provider>();

  public shared ({ caller }) func postDemand(name : Text, phone : Text, location : Text, need : Text, timing : Text, budget : ?Text, consent : Bool) : async Nat {
    demandId += 1;
    let demand : Demand = {
      name;
      phone;
      location;
      need;
      timing;
      budget;
      consent;
      timestamp = Time.now();
    };
    demands.add(demandId, demand);
    demandId;
  };

  public shared ({ caller }) func getDemand(id : Nat) : async Demand {
    switch (demands.get(id)) {
      case (null) { Runtime.trap("Demand does not exist") };
      case (?demand) { demand };
    };
  };

  public shared ({ caller }) func registerProvider(businessName : Text, phone : Text, city : Text, categories : [Text], serviceAreas : Text, consent : Bool) : async Nat {
    providerId += 1;
    let provider : Provider = {
      businessName;
      phone;
      city;
      categories;
      serviceAreas;
      consent;
      timestamp = Time.now();
    };
    providers.add(providerId, provider);
    providerId;
  };

  public shared ({ caller }) func getDemands() : async [Demand] {
    demands.values().toArray().sort();
  };

  public query ({ caller }) func getProviders() : async [Provider] {
    providers.values().toArray().sort();
  };
};
