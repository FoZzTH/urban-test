import { getRepository } from 'typeorm';

import { AddressEntity } from '../entities/address.entity';
import { LocationInfo } from '../types/locationInfo.type';
import { Nullable } from '../types/nullable.type';

class AddressRepository {
  async save(
    address: string,
    locationInfo: LocationInfo
  ): Promise<AddressEntity> {
    const repository = getRepository(AddressEntity);

    const trainerEntity = repository.create({
      name: address,
      info: locationInfo,
    });

    return await repository.save(trainerEntity);
  }

  async findByAddress(address: string): Promise<Nullable<AddressEntity>> {
    const repository = getRepository(AddressEntity);
    return repository.findOne({ where: { name: address } });
  }
}

export const addressRepository = new AddressRepository();
