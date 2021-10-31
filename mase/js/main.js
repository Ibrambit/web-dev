const {Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Body, Events } = Matter;

const cellsHor = 14;
const cellsVer = 10;

const height = window.innerHeight;
const width = window.innerWidth;
const unitLengthX = width / cellsHor;
const unitLengthY = height / cellsVer;

const engine = Engine.create();
engine.gravity.y = 0;
const {world} = engine;
const render = Render.create({
  element : document.body,
  engine : engine,
  options : {
    wireframes : false,
    width,
    height
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

//walls
const walls = [
  Bodies.rectangle(width/2,0,width,2,{isStatic : true}),
  Bodies.rectangle(width/2,height,width,2,{isStatic : true}),
  Bodies.rectangle(0,height/2,2,height,{isStatic : true}),
  Bodies.rectangle(width,height/2,2,height,{isStatic : true}),
];
World.add(world, walls);

//mase gen

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0){
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

const grid = Array(cellsVer)
  .fill(null)
  .map(()=> Array(cellsHor).fill(false));

const verticals = Array(cellsVer)
  .fill(null)
  .map(()=> Array(cellsHor -1).fill(false));

const horizontals = Array(cellsVer -1)
  .fill(null)
  .map(()=> Array(cellsHor).fill(false));

const startRow = Math.floor(Math.random() * cellsVer);
const startColumn = Math.floor(Math.random() * cellsHor);

const stepThroughCell = (row, column) => {

  // if i visited the cell at[row,column], then return
    if (grid[row][column]){
      return;
    }

  //mark this cell as being visited
  grid[row][column] = true;

  //assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column,'up'],
    [row, column  + 1,'right'],
    [row + 1,column,'down'],
    [row,column - 1,'left']
  ]);

  //for each neighbor...
  for (let neighbor of neighbors) {
   const [nextRow,nextColumn,direction] = neighbor;

    //see if that neighbor is out of bounds
    if (nextRow <0 || nextColumn <0 || nextColumn >= cellsHor || nextRow >= cellsVer){
        continue;
    }
    //if i visited this neighbor continue to next one
    if (grid[nextRow][nextColumn]){
      continue;
    }
    //remove a wall for either horiz or vert
    if (direction === 'left'){
      verticals[row][column -1] = true;
    } else if (direction === 'right'){
      verticals[row][column] = true;
    }
    else if (direction === 'up'){
      horizontals[row-1][column] = true;
    }
    else if (direction === 'down'){
      horizontals[row][column] = true;
    }
    //visit the next cell
    stepThroughCell(nextRow,nextColumn);
  }
}

stepThroughCell(startRow,startColumn);

horizontals.forEach((row,rowIndex) => {
  row.forEach((open, columnIndex) => {
    if(open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX/2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      10,
      {label: 'wall',isStatic: true,render: {fillStyle: 'red'}}
    );
    World.add(world,wall)
  });
});

verticals.forEach((row,rowIndex) => {
  row.forEach((open,columnIndex) => {
    if(open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY/2,
      10,
      unitLengthY,
      {label: 'wall',isStatic: true,render: {fillStyle: 'red'}}
    );
    World.add(world,wall);
  });
});

// goal
const goal = Bodies.rectangle(
  width - (unitLengthX / 2),
  height - (unitLengthY / 2),
  unitLengthX * .7,
  unitLengthY * .7,
  {
    label: 'goal',
    isStatic : true,
    render: {fillStyle: 'green'}
  }
);
World.add(world,goal);

//ball
const ballRadius = Math.min(unitLengthX,unitLengthY) / 4;
const ball = Bodies.circle(
  unitLengthX / 2,
  unitLengthY / 2,
  ballRadius,
  {label: 'ball',render: {fillStyle: 'blue'}}
);
World.add(world,ball);

// add movement

document.addEventListener('keydown', event => {
  const {x,y} = ball.velocity;
  if(event.keyCode === 87){
    Body.setVelocity(ball,{x, y: y-5 });
  }
  if(event.keyCode === 68){
    Body.setVelocity(ball,{x: x+5, y });
  }
  if(event.keyCode === 83){
    Body.setVelocity(ball,{x, y: y+5 });
  }
  if(event.keyCode === 65){
    Body.setVelocity(ball,{x: x-5, y });
  }
});

// win condition

Events.on(engine, 'collisionStart', event =>{
  event.pairs.forEach( collision => {
    const labels = ['goal','ball'];

    if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)){
      document.querySelector('.winner').classList.remove('hidden');
      world.gravity.y = 1;
      world.bodies.forEach(body => {
        if(body.label === 'wall') {
          Body.setStatic(body, false);

        }
      });
    }
  });
});


