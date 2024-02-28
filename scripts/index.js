const productsContainer = document.getElementById('products__container');

const loadPhones = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones);
};

const displayPhone = (phones) => {
  phones.forEach((phone) => {
    productsContainer.innerHTML += `
    <div
      class="flex flex-col items-center justify-center rounded-lg border border-['#CFCFCF'] px-9 py-6">
      <div class="w-full h-[300px] flex items-center justify-center bg-blue-600 bg-opacity-5 rounded-lg mb-6">
        <img src=${phone.image} class="" alt="" />
      </div>
      <h3 class="text-neutral-700 text-[25px] font-bold mb-5">${phone.phone_name}</h3>
      <p class="text-neutral-500 text-lg font-normal text-center mb-2">
        There are many variations of passages of available, but the majority have suffered
      </p>
      <p class="text-neutral-700 text-[25px] font-bold mb-4">$999</p>
      <button class="bg-blue-600 rounded-lg py-2 px-6 text-white text-xl font-semibold">
        Show Details
      </button>
    </div>
    `;
  });
};

loadPhones();
