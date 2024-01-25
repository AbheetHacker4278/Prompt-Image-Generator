let clkbtn = document.querySelector('.submit-icon');
let inputelem = document.querySelector('.inpt');
let imagesection = document.querySelector('.images-section');
let loader = document.querySelector('.loader');
let loader2 = document.querySelector('.loader2');
let esra = document.querySelector('.error');

document.addEventListener('DOMContentLoaded', () => {
    clkbtn.addEventListener('click', async () => {
        imagesection.innerHTML = '';
        loader.style.display = 'block';
        loader2.style.display = 'none';
        esra.style.display = 'none';
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Api_key}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "prompt": inputelem.value,
                "n": 1,
                "size": "1024x1024"
            })
        }

        try {
            let getdata = await fetch('https://api.openai.com/v1/images/generations', options);
            let struct = await getdata.json();

            setTimeout(()=>{
                struct?.data.forEach(imageobj =>{
                    const imagecontainer = document.createElement('div');
                    imagecontainer.classList.add('imagecontainer');
                    const imageElement = document.createElement('img');
                    imageElement.setAttribute('src' , imageobj.url);
                    imagecontainer.append(imageElement);
                    imagesection.append(imagecontainer);
                })
                loader.style.display = 'none';
            } , 3000)
            
            // console.log(struct);
            if(struct?.error?.code == "content_policy_violation"){
                esra.style.display = 'none';
                loader.style.display = 'none';
                loader2.style.display = 'block';
            }
            else if(struct?.created){
                loader.style.display = 'none';
                loader2.style.display = 'none';
                esra.style.display = 'none';
            }
            else{
                esra.style.display = 'block';
                loader.style.display = 'none';
            }
        } 
        catch (error) {
            console.log("error caught");
        }
    });
});

document.addEventListener("contextmenu", (e)=>{
    e.preventDefault();
},false);
