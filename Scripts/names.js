const names = ["Daryl Anderson", "Sherrie Barrick", "Joe Bell", "David Berg", "Steve Brebner", "Marty Buswell", "Gary Cannell", "Tim Cantor", "Leslie Chapman", "Dennis Cleveland", "Dan Danielson", "Eddie Duarte", "Steve Estep", "Jeffrey Evans", "Lisa Falk", "Debra Fant", "Lee Fellenburg", "Debra Frederick", "Lybia Garrett", "Mike Graham", "Ken Grassi", "Dana Hayden", "Carl Heenan", "Patrick Isakson", "Diane Jarmon", "Kerry Kade", "Mark Kirpes", "Ken Krona", "Roger Kuhl", "Michael Langdon", "Danette Mandt", "Richard Mason", "Roy Mason", "Roxy McClure", "Rocky McGallian", "Karen McKay", "Deb Nelson", "Dirk Post", "Connie Ravers", "Doug Richards", "Kris Rosendahl", "Sue Stevens", "Sandy Stewart", "Jo Streets", "Theresa Thetford", "Paulette Tropiano", "Kathy Turnipseed", "Bruce Walmer", "Curt Wegner", "Gail Wentworth", "Donald Whiton", "Sue Williams", "Jim Willoughby", "Paul Wilson", "Joe Winski", "Sue Yadon", "Jackie Bjorkman", "Rand Chiarovano", "Danette Engelhardt", "Richard. Mead", "Ramonda Revis"]

names.sort(function(a, b) {
  const aLastName = a.split(" ")[1];
  const bLastName = b.split(" ")[1];
  return aLastName.localeCompare(bLastName);
});

console.log(names);