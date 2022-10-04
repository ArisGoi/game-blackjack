



document.getElementById('card-design-select').addEventListener("change", (ev)=>{

    document.querySelector('body').setAttribute('card-design', ev.target.value);

} );