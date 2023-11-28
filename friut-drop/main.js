
import Matter from 'matter-js'
import { FRUITS } from "./matter.js";

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;


const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;


let currentBody = null;
let currentFruit = null;
let disableAction = false;
let interval = null;


const engine = Engine.create();
const world = engine.world;
engine.world.gravity.y = 1;


//바닥
const ground = Bodies.rectangle(windowWidth/2, windowHeight-50, windowWidth/4, 10, {
    isStatic: true
});

//왼쪽 벽
const wallLeft = Bodies.rectangle(windowWidth/2.7, windowHeight-277.4, windowWidth/100, windowHeight/2,{
    isStatic: true
});
//오른쪽 벽
const wallRight = Bodies.rectangle(windowWidth/ 1.6, windowHeight-277.4, windowWidth/100, windowHeight/2,{
    isStatic: true
});

//데드라인
const deadLine = Bodies.rectangle(windowWidth/2, windowHeight-400, windowWidth/4, 10,{
    isStatic: true
});

//게임판 생성
World.add(engine.world, [ground, wallLeft, wallRight, deadLine]);


//과일 생성
const nextFruit = ()=> {
    const index = Math.floor(Math.random() * 5);
    const fruit = FRUITS[index];

    const body = Bodies.circle(windowWidth/2, 50, fruit.radius, {
        index: index,
        isSleeping: true,
        restitution: 0.2,
        moveAble: true
    });

    currentBody = body;
    currentFruit = fruit;

    World.add(world, body);
}

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: windowWidth,
        height: windowHeight,
        wireframes: false,
        background: '#fff'
    }
});

window.onmousemove = (event) => {
    if(currentBody.moveAble){
        currentBody.position.x = event.offsetX
    }else{

    }
}

render.canvas.addEventListener("click", (e) => {
    currentBody.isSleeping = false;
    currentBody.moveAble = false;


    setTimeout( () => {nextFruit()}, 1000);
}, false);

Engine.run(engine);
Render.run(render);

//첫 과일 생성
nextFruit();

Events.on(engine, "collisionStart", (event) => {
});
