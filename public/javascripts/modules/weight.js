// const startWeight = document.getElementById('lbs');
// startWeight.addEventListener("keyup", function getValue() {
//   const text = this.value;
//   document.querySelector(".starting-weight").innerHTML = text;  
// });

function startweight(v) {
    v.on("keyup", function () {
        const weight = this.value;
        document.querySelector(".starting-weight").innerHTML = weight;  
    });
    getValue(weight);
    // input.on("keyup", alert('Helloo'));
    // alert('hello');
}

export default startweight;