const normalizeUser = (userData) => {
  if (!userData.image) {
    userData.image = {};
  }
  if (!userData.name) {
    userData.name = {};
  }
  if (!userData.address) {
    userData.address = {};
  }

  userData.image = {
    url:
      userData.image.url ||
      userData.url ||
      "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
    alt: userData.image.alt || userData.alt || "yellow fluffy chickens",
  };

  delete userData.url;
  delete userData.alt;

  userData.name = {
    firstName: userData.name.firstName || userData.firstName,
    lastName: userData.name.lastName || userData.lastName,
  };

  delete userData.firstName;
  delete userData.lastName;

  userData.address = {
    country: userData.address.country || userData.country,
    city: userData.address.city || userData.city,
    street: userData.address.street || userData.street,
    houseNumber: userData.address.houseNumber || userData.houseNumber,
    zip: userData.address.zip || userData.zip,
    state: userData.address.state || userData.state || "",
  };
  delete userData.country;
  delete userData.city;
  delete userData.street;
  delete userData.houseNumber;
  delete userData.state;
  delete userData.zip;

  return userData;
};

module.exports = normalizeUser;
