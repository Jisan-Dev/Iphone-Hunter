const loadPhones = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
  const data = await res.json();
  const phones = data.data;
  for (let phone of phones) {
    console.log(phone.slug);
  }
};

loadPhones();
