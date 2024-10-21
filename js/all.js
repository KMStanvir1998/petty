const loadCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error));
};

const loadPets = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};

const loadCategoryPets = (id)=>{
//    alert(id);
   fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
   .then(res => res.json())
   .then((data) => displayPets(data.data))
   .catch((error) => console.log(error));
}

const displayCategory = (categories)=>{
    const categoryContainer = document.getElementById('categories');

    categories.forEach((data) =>{
    //    console.log(data);
       const buttonContainer = document.createElement('div');
       buttonContainer.innerHTML = `
         <button onclick="loadCategoryPets('${data.category}')" class="btn">${data.category}</button>
        `
       
       categoryContainer.append(buttonContainer);
    })
}

const displayDetails =(pet) =>{
    console.log(pet.image);
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = `
      <img src="${petData.image}"/>
      <h3>${pet.breed}</h3>
    `
    document.getElementById('customModal').showModal();
};

const loadDetails = async(petId) =>{
    console.log(petId);
    const url =  `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayDetails(data.petData);
}


const displayPets = (pets) =>{
    const petContainer = document.getElementById('pets');
    petContainer.innerHTML = "";
    
    if (pets.length == 0){
        petContainer.classList.remove("grid")
        petContainer.innerHTML = `
         <div class="min-h-[600px] w-full flex flex-col gap-5 justify-center items-center error-bg rounded">
           <img src="images/error.webp">
           <h2 class="text-[24px] font-bold text-black">No Information Available</h2>
           <p class="text-[16px] font-light text-black text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at </br> 
              its layout. The point of using Lorem Ipsum is that it has a.</p>
         </div>
       `;
       return;
    }
    

    

    




    pets.forEach((pets) =>{
       const card = document.createElement("div");
        card.classList = "card bg-base-100 w-96 shadow-xl mt-5";
        card.innerHTML = `
          <figure class="h-[200px]">
           <img src="${pets.image}" class="rounded-lg h-full w-full object-cover"/>
        </figure>
        <div class="card-body">
            <h2 class="card-title ml-[3px]">${pets.breed}</h2>
            <h3 class="flex gap-1 ml-[3px]"><img class="w-[20px] h-[20px]" src="images/breed.png"> Breed: ${pets.breed}</h3>
            <h3 class="flex gap-1 ml-[3px]"><img class="w-[20px] h-[20px]"  src="images/birth.png"> Birth: ${pets.date_of_birth}</h3>
            <h3 class="flex gap-1 ml-[3px]"><img class="w-[20px] h-[20px]"  src="images/gender.png"> Gender: ${pets.gender}</h3>
            <h3 class="flex gap-1 ml-[3px]"><img class="w-[20px] h-[20px]"  src="images/price.png"> Price: ${pets.price}$</h3>
            <div class="card-actions flex justify-around items-center btn-border-top gap-5">
            <button class="px-[20px] py-[10px] outline-cyan-800 border-solid btn-content"><img src="images/like.png"></button>
            <button class="px-[20px] py-2 outline-cyan-800 border-solid btn-content">Adopt</button>
            <button onclick="loadDetails(${pets.petId})" class="px-[20px] py-2 outline-cyan-800 border-solid btn-content" id="petDetails">Details</button>
            </div>
        </div>
        `
        petContainer.append(card); 
        
        
    })

}

loadCategory();
loadPets()