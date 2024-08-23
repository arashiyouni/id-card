// import { Injectable } from "@nestjs/common";
// import { RepositoryDB } from "../interface/declarations";
// import { Repository } from "typeorm";
// import { Alumno } from "../Models/entities/Alumno";
// import { InjectRepository } from "@nestjs/typeorm";


// @Injectable()
// export class SqlServerRepository implements RepositoryDB{
//     constructor(
//         @InjectRepository(Alumno)
//         private readonly repositoryORM = Repository<Alumno>
//     ){}
//     insert() {
//         throw new Error("Method not implemented.");
//     }
//     update() {
//         throw new Error("Method not implemented.");
//     }

//     get(carnet: string){
//         //return await this.repositoryORM.fi
//     }
// }