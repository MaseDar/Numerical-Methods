let alpha, betta, gamma, delta, epsilon;
let A, B, aa, bb, n, max = 0;

function getParams(){
    aa = +document.getElementById("a").value
    bb = +document.getElementById("b").value
    A = +document.getElementById("A").value
    B = +document.getElementById("B").value
    n = +document.getElementById("n").value
    alpha = +document.getElementById("alpha").value;
    betta = +document.getElementById("betta").value;
    gamma = +document.getElementById("gamma").value;
    delta = +document.getElementById("delta").value;
    epsilon = +document.getElementById("epsilon").value;
    console.log("a, b, ..", {aa, bb, alpha, betta, gamma, delta, epsilon})
}


function Start(){
    
    getParams();
    dataPoints = [];
    let param = 1;
    dataPoints = printf(A, B, param, aa, bb, n, dl = 0.0625, dataPoints)
    
    var data = [];
    var dataSeries = { type: "line" };

    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
    console.log("data", data)

    //Better to construct options first and then pass it as a parameter
    var options = {
        zoomEnabled: true,
        animationEnabled: true,
        title: {
            text: "Функция"
        },
        axisY: {
            lineThickness: 1
        },
        data: data  // random data
        };
    return options
}

function myFunction(x) {
    let difference = alpha**2-x**2 == 0 ? 0.00001 : alpha**2-x**2;
    return epsilon * Math.sin( (betta*x) / (difference)  ) + gamma * Math.cos(delta*x);
}

function printf(A, B, param, aa, bb,  n, dl, dataPoints){

    // ctx.fillStyle = "#FF00FF"; 
  
  if ( param == 1)
  {
      for(let a = A; a <= B; a = a+0.01){
           var nn =  Runge (a, b, n, dl);
           var y = simpson (aa, bb, nn);
           dataPoints.push({
               x: -A + a,
            //    ТОЧНО ЛИ -y??
               y: -y
            })
            // console.log("test", dataPoints)
    //   ctx.fillRect(Math.round(-A + a), Math.round(Number(D)*perY - y * perY), 1 , 1);

    }
  }
  if ( param == 2)
  {
      for(b= Number(A); b <= Number(B); b = b+0.01/perX){
           var nn =  Runge (a, b, n, dl);
           var y = simpson (aa, bb, nn);
           dataPoints.push({
            x: -A + b,
            y: -y
         })
    //   ctx.fillRect(Math.round(-Number(A)*perX+ b * perX), Math.round(Number(D)*perY - y * perY), 1 , 1);
    }
  }
  if ( param == 3){
      for(m= Number(A); m <= Number(B); m = m+0.01/perX){
           var nn =  Runge (a, b, n, dl);
           var y = simpson (aa, bb, nn);
    //   ctx.fillRect(Math.round(-Number(A)*perX+ m * perX), Math.round(Number(D)*perY - y * perY), 1 , 1);
    }
  }
  if ( param == 4)
  {
      for(e= Number(A); e <= Number(B); e = e+0.01/perX){
           var nn = Runge (a, b, n, dl);
           var y = simpson (aa, bb, nn);
    //   ctx.fillRect(Math.round(-Number(A)*perX+ e * perX), Math.round(Number(D)*perY - y * perY), 1 , 1);
    }
  }
  return dataPoints;
}
  
  
function Runge (a, b, n, dl)
{
    var n1 = n;
    var n2 = 2*n1;
    
        var I1 = simpson (aa, bb, n1);
        var I2 = simpson (aa, bb, n2);
    //   document.getElementById('max').innerHTML= Number(dl) ;
    while (Math.abs (I2 - I1) > dl)
    {
        n1 = n2;
        n2 = 2*n1;
        I1 = simpson (aa, bb, n1);
        I2 = simpson (aa, bb,n2);
    }
    if (n1>=max) 
        max = n1;
    return n1;
}

// Need fix simpson (return integral, but need y coordinate)
function simpson (aa, bb, n){
const width = (bb-aa)/n;
let simpson_integral = 0;
let dot_y = A; 
for(let step = 0; step < n; step++) {
    const x1 = aa + step*width;
    const x2 = aa + (step+1)*width;
    simpson_integral += (x2-x1)/6.0*(myFunction(x1) + 4.0*myFunction(0.5*(x1+x2)) + myFunction(x2));
}
return simpson_integral;
//   var hh = (bb-aa)/n; 
//   var f = [];
//   var x = [];
//   x[0] = aa;
//   for (var i=1; i<= n; i++){
//       x[i] = x[i-1] + hh;
//   }
    
//   for (var i=0; i<= n; i++){
//       if ((x[i]- (m))== 0)
//           f[i] =Number(a)*Math. sin ( Number(b) *x[i]) * Math.cos ( Number(e)/(((x[i]+0.00001-Number(m)) + (x[i]-0.00001-Number(m)))/2)* (((x[i]+0.00001-Number(m)) + (x[i]-0.00001-Number(m)))/2));
//       else
//           f[i] = Number(a)*Math. sin ( Number(b) *x[i]) * Math.cos ( Number(e)/ ((x[i]- Number(m))* (x[i]- Number(m))));

//   }
//   var z = 0;
//   for (var i=1; i<=Number (n); i++){
//       z += f [i];
//   }
//   return hh*z;
}

  