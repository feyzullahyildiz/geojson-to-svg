const cities = require('./iller.json')
const centroids = require('./iller-orta.json')
const container = document.querySelector('.container')

// [ 2857405, 4275017 ], [ 2857405, 5175729 ], [ 4989109, 5175729 ], [ 4989109, 4275017 ], [ 2857405, 4275017 ] //bbox
const xSpace = 1420
const ySpace = 2590
let pointArray = ''
for(const index in cities.features){
    const feature = cities.features[index]
    const code = centroids.features[index].properties.ILKOD
    let [x, y] = centroids.features[index].geometry.coordinates
    x = parseInt((x/2000) - xSpace)
    y = parseInt(ySpace - (y/2000))
    pointArray += `<g>`
    for (const polygon of feature.geometry.coordinates) {
        let points = ''
        for (const [_x, _y] of polygon[0]) {
            points += `${parseInt((_x/2000) - xSpace)},${parseInt(ySpace - (_y/2000))} `
        }
        pointArray +=`<polygon points="${points}"/>`
    }
    pointArray += `
    <text x="${x}" y="${y}" fill="white">
        <tspan text-anchor="middle">${code}</tspan>
    </text>
    </g>`
}
let svg = `
<svg viewBox="0 0 1080 460" width="100%">
${pointArray}
</svg>
`
container.innerHTML = svg


const citiesPolygons = container.querySelectorAll('svg g')
const onEnter = function(){
    this.querySelectorAll('polygon').forEach(polygon => {
        polygon.style.fill = 'red'
    })
}
const onLeave = function(){
    this.querySelectorAll('polygon').forEach(polygon => {
        polygon.style.fill = ''
    })

}
citiesPolygons.forEach(city => {
    city.addEventListener('mouseover', onEnter)
    city.addEventListener('mouseleave', onLeave)
})