import { Ocurrency } from '../../model/Ocurrency';

interface IOcurrencyRepository {
    findByName(name: string): Ocurrency[];
    list(): Ocurrency[];
}

export { IOcurrencyRepository };
