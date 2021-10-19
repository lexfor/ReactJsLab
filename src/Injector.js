import {
  AuthenticationController,
  JwtService,
} from './api/authentication';
import { PatientController } from './api/patient';
import { ResolutionService, ResolutionRepository, ResolutionController } from './api/resolutions';
import {
  DoctorController, DoctorService, DoctorSpecializationRepository,
} from './api/doctor';
import { SpecializationsRepository, SpecializationsService, SpecializationsController } from './api/specializations';
import { connection } from './api/helpers/DBconnection';
import { AppointmentsController, AppointmentsRepository, AppointmentsService } from './api/appointments';
import { StatusesController } from './api/statuses';
import { UsersRepository, UsersService } from './api/users';
import {DB_ACCESS} from "./config";

class Injector {
  constructor() {
    console.log(DB_ACCESS);
    /*    initializeDB(connection).then(console.log('Database initialized')); */
    this.resolutionRepository = new ResolutionRepository(connection);
    this.specializationsRepository = new SpecializationsRepository(connection);
    this.doctorSpecializationRepository = new DoctorSpecializationRepository(connection);
    this.appointmentsRepository = new AppointmentsRepository(connection);
    this.usersRepository = new UsersRepository(connection);

    this.jwtService = new JwtService();
    this.resolutionService = new ResolutionService(this.resolutionRepository);
    this.doctorService = new DoctorService(this.doctorSpecializationRepository);
    this.specializationsService = new SpecializationsService(this.specializationsRepository);
    this.appointmentsService = new AppointmentsService(this.appointmentsRepository);
    this.usersService = new UsersService(this.usersRepository);

    this.authenticationController = new AuthenticationController(
      this.usersService,
      this.jwtService,
    );
    this.patientController = new PatientController(this.usersService);
    this.resolutionController = new ResolutionController(
      this.resolutionService,
      this.appointmentsService,
      this.usersService,
    );
    this.doctorController = new DoctorController(
      this.doctorService,
      this.usersService,
    );
    this.specializationsController = new SpecializationsController(this.specializationsService);
    this.appointmentsController = new AppointmentsController(
      this.appointmentsService,
      this.usersService,
    );
    this.statusesController = new StatusesController();
  }

  get getPatientController() {
    return this.patientController;
  }

  get getResolutionController() {
    return this.resolutionController;
  }

  get getAuthenticationController() {
    return this.authenticationController;
  }

  get getDoctorController() {
    return this.doctorController;
  }

  get getSpecializationsController() {
    return this.specializationsController;
  }

  get getAppointmentsController() {
    return this.appointmentsController;
  }

  get getStatusesController() {
    return this.statusesController;
  }
}

const injector = new Injector();
export { injector };
