import { Server } from 'azle';
import { id } from 'azle/src/lib/ic/id';
import express, { NextFunction, Request, Response } from 'express';

type Auto = {
    id: number;
    marca: string;
    modelo: string;
    color: string;
    motor: string;
    combustible: string;
    asientos: number;
    altura: string;
    ancho: string;
    cilindros: number;
    precio: string;
}

let autos: Auto[] = [{
    id: 1,
    marca: 'Ford',
    modelo: 'Ford Edge 2024',
    color: 'Plata',
    motor: '2.0L I4 EcoBoost® (Turbo)',
    combustible: 'Gasolina',
    asientos: 6,
    altura: '68.3 pulgadas',
    ancho: '85.8 pulgadas',
    cilindros: 4,
    precio: '$1,070,000'
    },
    {
        id: 2,
        marca: 'Volkswagen',
        modelo: 'T‑Cross 2024',
        color: 'Blanco',
        motor: '1.6 L con 110 Hp',
        combustible: 'Gasolina',
        asientos: 6,
        altura: '1573 mm',
        ancho: '1760 mm',
        cilindros: 3,
        precio: '$41,750'
    },
    {
        id: 3,
        marca: 'GMC',
        modelo: 'Sierra',
        color: 'Negro',
        motor: '6.2L V8 425 HP',
        combustible: 'Gasolina',
        asientos: 5,
        altura: '5,885mm',
        ancho: '2,063mm',
        cilindros: 8,
        precio: '$1,199,400'
    },
    {
        id: 4,
        marca: 'Ford',
        modelo: 'Expedition',
        color: 'Gris',
        motor: '5.4 L V8',
        combustible: 'Gasolina',
        asientos: 8,
        altura: '1992 mm',
        ancho: '1996 mm',
        cilindros: 8,
        precio: '$58,000'
    },
    {
        id: 5,
        marca: 'Ford',
        modelo: 'Mustang 2024',
        color: 'Amarillo',
        motor: '5,0 L V8',
        combustible: 'Gasolina',
        asientos: 4,
        altura: '1,391.92 mm',
        ancho: '1,915.16 mm',
        cilindros: 8,
        precio: '$1,588,000'
    },
    {
        id: 6,
        marca: 'Dodge',
        modelo: 'RAM 4000',
        color: 'Rojo',
        motor: '5.7 L V8',
        combustible: 'Diesel',
        asientos: 6,
        altura: '2029 mm',
        ancho: '6586 mm',
        cilindros: 8,
        precio: '$868,900'
    },
    {
        id: 7,
        marca: 'KIA',
        modelo: 'Kia K3 Hatchback',
        color: 'Blanco',
        motor: '1.6 L',
        combustible: 'Gasolina',
        asientos: 6,
        altura: '1495 mm',
        ancho: '1765 mm',
        cilindros: 4,
        precio: '$461,900'
    },
    {
        id: 8,
        marca: 'Toyota',
        modelo: 'Corolla Cross',
        color: 'Verde',
        motor: '2.0 L con 168 HP',
        combustible: 'Gasolina',
        asientos: 5,
        altura: '1,62 m',
        ancho: '1,83 m',
        cilindros: 4,
        precio: '$528,700'
    },
    {
        id: 9,
        marca: 'Audi',
        modelo: 'Audi q2',
        color: 'Azul',
        motor: '1,4 L',
        combustible: 'Gasolina',
        asientos: 5,
        altura: '1.477 mm',
        ancho: '1.794 mm',
        cilindros: 3,
        precio: '$689,900'
    },
    {
        id: 10,
        marca: 'Fiat',
        modelo: ' Fiat Ducato Cargo Van',
        color: 'Verde',
        motor: '2.3 Multijet de 130 HP',
        combustible: 'Diesel',
        asientos: 3,
        altura: '2524 mm',
        ancho: '5413 mm',
        cilindros: 3,
        precio: '$695,000'
    }
]

function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Es funcionable");
    next();
}

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.use(logger);

    //GET
    app.get('/autos', (req, res) => {
        res.json(autos);
    });

    //POST
    app.post("/autos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const Auto = req.body;
        const autoExistente = autos.find((auto) => auto.id === id);
    
        if (autoExistente) {
            res.status(404).send("Este auto ya existe");
            return;
        }
        autos.push({ ...Auto, id });
    
        res.send(('OK'));
    });

    //PUT
    app.put("/autos/:id", (req, res) =>{
        const id = parseInt(req.params.id);
        const auto = autos.find((auto) => auto.id === id);

        if (!auto) {
            res.status(404).send("No encontrado");
            return;
        }

        const updateAuto = { ...auto, ...req.body };

        autos = autos.map((b) => b.id === updateAuto.id ? updateAuto : b);

        res.send("ok");

    })

    //DELETE
    app.delete("/autos/:id", (req, res) =>{
        const id = parseInt(req.params.id);
        autos = autos.filter((auto) => auto.id !== id);
        res.send("Eliminado")
    });

    return app.listen();
});