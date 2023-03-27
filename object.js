const obj = {
};
obj[0] = {title:"Boeing-Saab T-7", image:"image\\T-7A-600x400.jpg",price:"275",num:0}

obj[1] = {title:"Chengdu J-20 (Black Eagle)", image:"image\\800px-J-20_at_Airshow_China_2016.jpg",price:"375",num:0}

obj[2] = {title:"Stavatti Javelin T-X", image:"image\\T-38.jpg",price:"385",num:0}

obj[3] = {title:"Sukhoi Checkmate(Su-75)", image:"image\\dsgsdg.jpg",price:"575",num:0}

obj[4] = {title:"9K720 Iskander", image:"image\\image_5a7ce05e761d83_80309459.jpeg",price:"275",num:0}

obj[5] = {title:"Grenade launcher", image:"image\\fff.jpg",price:"25",num:0}

obj[6] = {title:"RPG-7 Rocket Launcher", image:"image\\rpg-7-rocket-launcher-3d-model-max.jpg",price:"15",num:0}

obj[7] = {title:"RT-2PM Topol", image:"image\\RT-2PM_Topol.jpg",price:"505",num:0}

obj[8] = {title:"Ak 47 gun", image:"image\\AK-47.webp",price:"100",num:0}
let x;

for( x in obj){
    const data = document.getElementById("details");
    const div = document.createElement('div');
    div.classList.add('box')
    div.innerHTML = `
    <div class="card" id = "box" style="width: 18rem;">
    <img src="${obj[x].image}" class="image" alt="...">
    <div class="card-body">
      <h5 class="card-title">${obj[x].title}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <h4>Price : $${obj[x].price} B</h4>
      <button type="button" class ="cart" onclick="addcard(${obj[x].price},${x})">Add to Cart</button>
      <button type="button" class = "remove" onclick="rem(${obj[x].price},${x})" >Remove</button>
      <p class="item-cnt" >Item : <span id ="count-${x}">0</span></p>
    </div>
  </div>

  `
  data.appendChild(div);
}

let cont = 0;

/* remove card : checking how many product we have or not */

function rem(price,index){
     if(obj[index].num > 0){
      obj[index].num -= 1;
      document.getElementById(`count-${index}`).innerHTML=obj[index].num;
      const level = 1;
      cont = cont - 1;
      document.getElementById('total-products').innerHTML=cont;
      updateprice(price, level);
     }
}

/* Add card */

function addcard(price, index){
  obj[index].num++;
  document.getElementById(`count-${index}`).innerHTML=obj[index].num;
  console.log(obj[index].num, obj[index].title);
  cont = cont + 1;
  
  document.getElementById('total-products').innerHTML=cont;
  updateprice(price);
}
function updateprice(price, level){
    const oldprice = parseFloat(document.getElementById('p-price').innerText);
    const data = parseFloat(price);
    if(level == 1){
      const new_price = oldprice - data;
      document.getElementById('p-price').innerText=new_price;
      deliverycharge(new_price, level);
    }
    else{
      const new_price = data + oldprice;
      document.getElementById('p-price').innerText=new_price;
      deliverycharge(new_price);
    }
    
}

function deliverycharge(new_price, level){
  if(level == 1){
    if(new_price == 0){
      document.getElementById('D-charge').innerText="0";
      document.getElementById('S-cost').innerText="0";
    }
    else{
      if(new_price < 500){
        document.getElementById('D-charge').innerText="500";
        document.getElementById('S-cost').innerText="100";
      }
      else if(new_price  > 500 && new_price < 1500){
        document.getElementById('D-charge').innerText="300";
        document.getElementById('S-cost').innerText="400";
      }
      else{
        document.getElementById('D-charge').innerText="200";
        document.getElementById('S-cost').innerText="900";
      }
    }
     total_cost(new_price, level);
  }
  else{
    if(new_price < 500){
      document.getElementById('D-charge').innerText="500";
      document.getElementById('S-cost').innerText="100";
    }
    else if(new_price  > 500 && new_price < 1500){
      document.getElementById('D-charge').innerText="300";
      document.getElementById('S-cost').innerText="400";
    }
    else{
      document.getElementById('D-charge').innerText="200";
      document.getElementById('S-cost').innerText="900";
    }
    total_cost(new_price);

  }
  
}

function total_cost(new_price, level){
  const dcharge = parseFloat(document.getElementById('D-charge').innerText);
  const scost = parseFloat(document.getElementById('S-cost').innerText)
  /* const oldtotalcost = parseFloat(document.getElementById('T-cost').innerText); */
  const tcost = new_price + dcharge + scost;
  document.getElementById('T-cost').innerHTML = tcost;
  final_total(tcost);
}
function final_total(tcost){
    const TAX = 0.15 * tcost;
    document.getElementById('Tax').innerHTML=TAX;
    const grandtotal = tcost + TAX;
    document.getElementById('G-total').innerHTML = grandtotal;
    const discount = 0.05 * grandtotal;
    document.getElementById('discount').innerHTML = discount;
    const finaltotal = grandtotal - discount;
    document.getElementById('F-cost').innerHTML = finaltotal;

}

 /* order button  */

 function order(){
    const result = parseFloat(document.getElementById('F-cost').innerHTML);
    if(result == 0){
        alert("You aren't order anything. please order first !");
    }
    else{
      alert("Thanks for order. you are paid");
      location.reload();
    }
    
 }


