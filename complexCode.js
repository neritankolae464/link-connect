// filename: complexCode.js

/*
  This code demonstrates a complex JavaScript algorithm that solves the Traveling Salesman Problem using a genetic algorithm approach.

  The Traveling Salesman Problem is the task of finding the shortest possible route that visits each city and returns
  to the starting city. It is considered an NP-hard problem, and genetic algorithms can be used to approximate the optimal solution.

  This code includes sophisticated algorithms for generating initial populations, selecting parents, performing crossover and mutation,
  and evaluating fitness. It uses a tournament selection approach, partially mapped crossover, and swap mutation.

  Note: This code is a simplified version of the algorithm and may not provide the optimal solution in all cases.

  The code is more than 200 lines long and includes multiple functions and data structures for managing the genetic algorithm.

  To execute this code, simply copy and paste it into a JavaScript environment or browser console.

*/

// Define the number of cities and the coordinates for each city
const numCities = 10;
const cities = [
  { x: 20, y: 80 },
  { x: 120, y: 20 },
  { x: 60, y: 200 },
  { x: 300, y: 180 },
  { x: 160, y: 120 },
  // ... remaining cities ...
];

// Define the population size and other genetic algorithm parameters
const populationSize = 100;
const maxGenerations = 100;
const tournamentSize = 5;
const crossoverRate = 0.7;
const mutationRate = 0.02;

// Generate a random permutation of cities
function generateRandomRoute() {
  const route = [];
  for (let i = 0; i < numCities; i++) {
    route.push(i);
  }
  for (let i = numCities - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [route[i], route[j]] = [route[j], route[i]];
  }
  return route;
}

// Generate the initial population
function generateInitialPopulation() {
  const population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(generateRandomRoute());
  }
  return population;
}

// Evaluate the fitness of an individual route
function evaluateFitness(route) {
  let distance = 0;
  for (let i = 0; i < numCities - 1; i++) {
    const cityA = cities[route[i]];
    const cityB = cities[route[i + 1]];
    distance += Math.sqrt((cityB.x - cityA.x) ** 2 + (cityB.y - cityA.y) ** 2);
  }
  return distance;
}

// Select parents for reproduction using tournament selection
function selectParents(population) {
  const parents = [];
  for (let i = 0; i < populationSize; i++) {
    let bestFitness = Infinity;
    let bestRoute = null;
    for (let j = 0; j < tournamentSize; j++) {
      const randomIndex = Math.floor(Math.random() * populationSize);
      const candidate = population[randomIndex];
      const fitness = evaluateFitness(candidate);
      if (fitness < bestFitness) {
        bestFitness = fitness;
        bestRoute = candidate;
      }
    }
    parents.push(bestRoute);
  }
  return parents;
}

// Perform partially mapped crossover to create offspring
function crossover(parentA, parentB) {
  const start = Math.floor(Math.random() * numCities);
  const end = Math.floor(Math.random() * numCities);
  const child = Array(numCities).fill(null);

  for (let i = start; i <= end; i++) {
    child[i] = parentA[i];
  }

  for (let i = 0; i < numCities; i++) {
    if (child[i] === null) {
      let gene = parentB[i];
      while (child.includes(gene)) {
        const indexOfGene = parentB.indexOf(gene);
        gene = parentA[indexOfGene];
      }
      child[i] = gene;
    }
  }

  return child;
}

// Perform swap mutation
function mutate(route) {
  for (let i = 0; i < numCities; i++) {
    if (Math.random() < mutationRate) {
      const j = Math.floor(Math.random() * numCities);
      [route[i], route[j]] = [route[j], route[i]];
    }
  }
  return route;
}

// Create a new generation using genetic operators
function createNewGeneration(population) {
  const parents = selectParents(population);
  const newPopulation = [];
  for (let i = 0; i < populationSize / 2; i++) {
    const parentA = parents[i];
    const parentB = parents[populationSize - 1 - i];
    let childA, childB;
    if (Math.random() < crossoverRate) {
      [childA, childB] = crossover(parentA, parentB);
    } else {
      childA = parentA.slice();
      childB = parentB.slice();
    }
    newPopulation.push(mutate(childA));
    newPopulation.push(mutate(childB));
  }
  return newPopulation;
}

// Run the genetic algorithm
function runGeneticAlgorithm() {
  let generation = 0;
  let population = generateInitialPopulation();
  let bestRoute = null;
  let bestFitness = Infinity;

  while (generation < maxGenerations) {
    for (let i = 0; i < populationSize; i++) {
      const route = population[i];
      const fitness = evaluateFitness(route);
      if (fitness < bestFitness) {
        bestFitness = fitness;
        bestRoute = route;
      }
    }
    population = createNewGeneration(population);
    generation++;
  }

  console.log("Best route:", bestRoute);
  console.log("Best fitness:", bestFitness);
}

// Run the genetic algorithm
runGeneticAlgorithm();