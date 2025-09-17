import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",
});

const teams = [
    { id: 1, name: "McLaren", base: "Woking, UK" },
    { id: 2, name: "Mercedes-AMG Petronas F1 Team", base: "Brackley, UK" },
    { id: 3, name: "Red Bull Racing", base: "Milton Keynes, UK" },
    { id: 4, name: "Scuderia Ferrari", base: "Maranello, Italy" },
    { id: 5, name: "Aston Martin Aramco F1 Team", base: "Silverstone, UK" },
    { id: 6, name: "BWT Alpine F1 Team", base: "Enstone, UK" },
    { id: 7, name: "Visa Cash App RB F1 Team", base: "Faenza, Italy" },
    { id: 8, name: "Williams Racing", base: "Grove, UK" },
    { id: 9, name: "Stake F1 Team Kick Sauber", base: "Hinwil, Switzerland" },
    { id: 10, name: "Haas F1 Team", base: "Kannapolis, USA" },
];

const drivers = [
    { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
    { id: 2, name: "Sergio Pérez", team: "Red Bull Racing" },
    { id: 3, name: "Lewis Hamilton", team: "Mercedes-AMG Petronas F1 Team" },
    { id: 4, name: "George Russell", team: "Mercedes-AMG Petronas F1 Team" },
    { id: 5, name: "Charles Leclerc", team: "Scuderia Ferrari" },
    { id: 6, name: "Carlos Sainz Jr.", team: "Scuderia Ferrari" },
    { id: 7, name: "Lando Norris", team: "McLaren" },
    { id: 8, name: "Oscar Piastri", team: "McLaren" },
    { id: 9, name: "Fernando Alonso", team: "Aston Martin Aramco F1 Team" },
    { id: 10, name: "Lance Stroll", team: "Aston Martin Aramco F1 Team" },
    { id: 11, name: "Esteban Ocon", team: "BWT Alpine F1 Team" },
    { id: 12, name: "Pierre Gasly", team: "BWT Alpine F1 Team" },
    { id: 13, name: "Daniel Ricciardo", team: "Visa Cash App RB F1 Team" },
    { id: 14, name: "Yuki Tsunoda", team: "Visa Cash App RB F1 Team" },
    { id: 15, name: "Alex Albon", team: "Williams Racing" },
    { id: 16, name: "Logan Sargeant", team: "Williams Racing" },
    { id: 17, name: "Valtteri Bottas", team: "Stake F1 Team Kick Sauber" },
    { id: 18, name: "Guanyu Zhou", team: "Stake F1 Team Kick Sauber" },
    { id: 19, name: "Kevin Magnussen", team: "Haas F1 Team" },
    { id: 20, name: "Nico Hülkenberg", team: "Haas F1 Team" },
];

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);
    return {teams};
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);
    return {drivers};
});

interface DriversParams {
    id: string;
}

server.get<{Params: DriversParams}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
        response.type("application/json").code(404);
        return { message: "Driver not found" };
    }else{
        response.type("application/json").code(200);
        return {driver};
    }
});

const port = parseInt(process.env.PORT || "3333", 10);

server.listen({ port }, () => {
    console.log(`Server is running on http://localhost:${port}`);
});