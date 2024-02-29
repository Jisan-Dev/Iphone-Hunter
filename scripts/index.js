const productsContainer = document.getElementById('products__container');
const searchInp = document.getElementById('searchInp');
const showAllBtn = document.getElementById('products__btn-show-all');

const loadPhones = async (searchValue = '13', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  // make container empty every time new search hit
  productsContainer.innerHTML = '';

  // display 'show all' btn if products are more than 12 in quantity
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove('hidden');
  } else {
    showAllBtn.classList.add('hidden');
  }

  // limiting to only show first 12 results
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  // loop through each phone object and insert html
  phones.forEach((phone) => {
    productsContainer.innerHTML += `
    <div
      class="flex flex-col items-center justify-center rounded-lg border border-['#CFCFCF'] px-9 py-6 shadow-lg">
      <div class="w-full h-[300px] flex items-center justify-center bg-blue-600 bg-opacity-5 rounded-lg mb-6">
        <img src=${phone.image} class="" alt="" />
      </div>
      <h3 class="text-neutral-700 text-[25px] font-bold mb-5">${phone.phone_name}</h3>
      <p class="text-neutral-500 text-lg font-normal text-center mb-2">
        There are many variations of passages of available, but the majority have suffered
      </p>
      <p class="text-neutral-700 text-[25px] font-bold mb-4">$999</p>
      <button onclick="showDetailHandler('${phone.slug}')" class="bg-blue-600 rounded-lg py-2 px-6 text-white text-xl font-semibold">
        Show Details
      </button>
    </div>
    `;
  });
  handleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
  handleLoadingSpinner(true);
  const searchValue = searchInp.value;
  loadPhones(searchValue, isShowAll);
};

const handleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementsByClassName('loading')[0];
  // for show all button
  const loadingSpinner2 = document.getElementsByClassName('loading')[1];
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner2.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
    loadingSpinner2.classList.add('hidden');
  }
};

const showAllHandler = () => {
  handleSearch(true);
};

const showDetailHandler = async (id) => {
  console.log('clicked', id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  // console.log(phone);
  document.getElementById('show_details_modal_phone-details').innerHTML = `
  <div class="w-full h-[300px] flex items-center justify-center bg-blue-600 bg-opacity-5 rounded-lg mb-6">
    <img src='${phone.image}'/>
  </div>
  <h3 class="font-bold text-3xl mb-4">${phone.name}</h3>
  <p class="mt-2 "><span class="font-extrabold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
  <p class="mt-2 "><span class="font-extrabold">Display Size:</span> ${
    phone?.mainFeatures?.displaySize
  }</p>
  <p class="mt-2 "><span class="font-extrabold">Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
  <p class="mt-2 "><span class="font-extrabold">Memory:</span> ${phone?.mainFeatures?.memory}</p>
  <p class="mt-2 "><span class="font-extrabold">Slug:</span> ${phone?.slug}</p>
  <p class="mt-2 "><span class="font-extrabold">Release data:</span> ${phone?.releaseDate}</p>
  <p class="mt-2 "><span class="font-extrabold">Brand:</span> ${phone?.brand}</p>
  <p class="mt-2 "><span class="font-extrabold">GPS:</span> ${phone?.others?.GPS ?? 'Not available'}</p>
  <p class="mt-2 "><span class="font-extrabold">Sensors:</span> ${phone?.mainFeatures?.sensors.join(
    ', '
  )}</p>`;

  show_details_modal.showModal();
};

loadPhones();
