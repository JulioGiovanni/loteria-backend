import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartas } from './entities/cartas.entity';
import { Repository } from 'typeorm';
import { Tablas } from './entities/tablas.entity';

@Injectable()
export class LoteriaService {
  constructor(
    @InjectRepository(Cartas)
    private cartaRepository: Repository<Cartas>,
    @InjectRepository(Tablas)
    private tablaRepository: Repository<Tablas>,
  ) {}

  async create(body: any) {
    const { numberOfCards } = body;
    console.log(numberOfCards);

    try {
      const cartas = await this.cartaRepository.find();

      for (let i = 0; i < numberOfCards; i++) {
        const tabla = new Tablas();
        tabla.cartas = []; // Inicializa el array de cartas

        while (tabla.cartas.length < 16) {
          const carta = cartas[Math.floor(Math.random() * cartas.length)];
          if (!tabla.cartas.some((c) => c.id === carta.id)) {
            tabla.cartas.push(carta);
          }
        }

        // Verificar si la tabla ya existe con las mismas cartas mediante consulta personalizada
        const existingTable = await this.tablaRepository
          .createQueryBuilder('tabla')
          .innerJoinAndSelect('tabla.cartas', 'carta')
          .where('tabla.id IN (:...ids)', {
            ids: tabla.cartas.map((carta) => carta.id),
          })
          .getOne();

        if (!existingTable) {
          console.log(tabla);
          await this.tablaRepository.save(tabla);
        } else {
          console.log('error');
          // La tabla ya existe, así que lanzamos error
          // Aquí lanzamos una excepción NotFoundException
          throw new NotFoundException('La tabla con esas cartas ya existe.');
        }
      }

      return { message: 'Tablas creadas exitosamente.', tablas: numberOfCards };
    } catch (error) {
      console.log(error);
      return 'Error creando tablas.';
    }
  }

  async findAll() {
    try {
      return await this.tablaRepository.find({
        relations: ['cartas'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async seed() {
    const cartas = [
      { nombre: 'El Gallo' },
      { nombre: 'El Diablito' },
      { nombre: 'La Dama' },
      { nombre: 'El Catrín' },
      { nombre: 'El Paraguas' },
      { nombre: 'La Sirena' },
      { nombre: 'La Escalera' },
      { nombre: 'La Botella' },
      { nombre: 'El Barril' },
      { nombre: 'El Árbol' },
      { nombre: 'El Melón' },
      { nombre: 'El Valiente' },
      { nombre: 'El Gorrito' },
      { nombre: 'La Muerte' },
      { nombre: 'La Pera' },
      { nombre: 'La Bandera' },
      { nombre: 'El Bandolón' },
      { nombre: 'El Violoncello' },
      { nombre: 'La Garza' },
      { nombre: 'El Pájaro' },
      { nombre: 'La Mano' },
      { nombre: 'La Bota' },
      { nombre: 'La Luna' },
      { nombre: 'El Cotorro' },
      { nombre: 'El Borracho' },
      { nombre: 'El Negrito' },
      { nombre: 'El Corazón' },
      { nombre: 'La Sandía' },
      { nombre: 'El Tambor' },
      { nombre: 'El Camarón' },
      { nombre: 'Las Jaras' },
      { nombre: 'El Músico' },
      { nombre: 'La Araña' },
      { nombre: 'El Soldado' },
      { nombre: 'La Estrella' },
      { nombre: 'El Cazo' },
      { nombre: 'El Mundo' },
      { nombre: 'El Apache' },
      { nombre: 'El Nopal' },
      { nombre: 'El Alacrán' },
      { nombre: 'La Rosa' },
      { nombre: 'La Calavera' },
      { nombre: 'La Campana' },
      { nombre: 'El Cantarito' },
      { nombre: 'El Venado' },
      { nombre: 'El Sol' },
      { nombre: 'La Corona' },
      { nombre: 'La Chalupa' },
      { nombre: 'El Pino' },
      { nombre: 'El Pescado' },
      { nombre: 'La Palma' },
      { nombre: 'La Maceta' },
      { nombre: 'El Arpa' },
      { nombre: 'La Rana' },
    ];

    try {
      await this.cartaRepository.save(cartas);
      return 'Cartas seeded successfully';
    } catch (error) {
      console.log(error);
      return 'Error seeding cartas';
    }
  }
}
