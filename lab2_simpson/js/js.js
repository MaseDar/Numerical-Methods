// Да-да, глобальные переменные - плохо, но время поджимает.
// Позже можете поправить, или пнуть меня vk.com/masedar
let alpha, betta, gamma, delta, epsilon;
let A, B, aa, bb, n, dl, param, max = 0;
// Получение параметров
function getParams(){
    param = +document.getElementById("param").value
    aa = +document.getElementById("a").value
    bb = +document.getElementById("b").value
    A = +document.getElementById("A").value
    B = +document.getElementById("B").value
    n = +document.getElementById("n").value
    dl = +document.getElementById("dl").value
    alpha = +document.getElementById("alpha").value;
    betta = +document.getElementById("betta").value;
    gamma = +document.getElementById("gamma").value;
    delta = +document.getElementById("delta").value;
    epsilon = +document.getElementById("epsilon").value;
    console.log("a, b, ..", {dl, param, aa, bb, alpha, betta, gamma, delta, epsilon})
    return {dl, param, aa, bb, alpha, betta, gamma, delta, epsilon}
}

function Start(){
    
    let {dl, param, aa, bb, alpha, betta, gamma, delta, epsilon} = getParams();
    dataPoints = [];
    dataPoints = printf(A, B, param, aa, bb, n, dl, dataPoints, alpha, betta, gamma, delta, epsilon)
    var data = [];
    // Тип отрисовки линий между точками - линия
    var dataSeries = { type: "line" };
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);
    
    console.log("data", data)
    // Параметры для new CanvasJS.Chart() в HTML
    var options = {
        zoomEnabled: true,
        animationEnabled: true,
        title: {
            text: "Функция"
        },
        axisY: {
            lineThickness: 1
        },
        // Те самые точки, которые мы и собираем
        data: data  
        };
    return options
}

// Наша функция 
function myFunction(x, alpha, betta, gamma, delta, epsilon) {
    let difference = alpha**2-x**2 == 0 ? 0.00001 : alpha**2-x**2;
    return epsilon * Math.sin( (betta*x) / (difference)  ) + gamma * Math.cos(delta*x);
}

// Вычисление точек для CanvasJS
function printf(A, B, param, aa, bb,  n, dl, dataPoints, alpha, betta, gamma, delta, epsilon){
// выборка выбранного параметра alpha - 1, betta - 2 ... и проход по ним соответственно
  switch(param){
    case 1:
        for(alpha = A; alpha <= B; alpha += dl){
            var y = simpson (aa, bb, n, alpha, betta, gamma, delta, epsilon);
            dataPoints.push({
               x: -A + alpha,
               y: -y
            })
        }
        break;
    case 2:
        for( betta = A; betta <= B; betta += dl){
            var y = simpson (aa, bb, n, alpha, betta, gamma, delta, epsilon);
               dataPoints.push({
                x: -A + betta,
                y: -y
             })
        }
        break;
    case 3:
        for(gamma = A; gamma <= B; gamma += dl){
            var y = simpson (aa, bb, n, alpha, betta, gamma, delta, epsilon);
            dataPoints.push({
             x: -A + gamma,
             y: -y
          })
        }
        break;
    case 4:
        for(delta = A; delta <= B; delta += dl){
            var y = simpson (aa, bb, n, alpha, betta, gamma, delta, epsilon);
            dataPoints.push({
                x: -A + delta,
                y: -y
            })
        }
        break;
    case 5:
        for(epsilon = A; epsilon <= B; epsilon += dl){
            var y = simpson (aa, bb, n, alpha, betta, gamma, delta, epsilon);
            dataPoints.push({
                x: -A + epsilon,
                y: -y
            })
        }
        break;
  }
  return dataPoints;    
}

// Сам метод Симпсона https://habr.com/ru/post/479202/
function simpson (aa, bb, n, alpha, betta, gamma, delta, epsilon){
    const width = (bb-aa)/n;
    let simpson_integral = 0;
    for(let step = 0; step < n; step++) {
        const x1 = aa + step*width;
        const x2 = aa + (step+1)*width;
        simpson_integral += (x2-x1)/6.0*(myFunction(x1, alpha, betta, gamma, delta, epsilon ) + 4.0*myFunction(0.5*(x1+x2), alpha, betta, gamma, delta, epsilon) + myFunction(x2, alpha, betta, gamma, delta, epsilon));
    }
    return simpson_integral;
}
    