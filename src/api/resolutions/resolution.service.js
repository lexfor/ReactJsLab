import { v1 as uuidv1 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../helpers/ApiError';

class ResolutionService {
  constructor(resolutionRepository) {
    this.resolutionRepository = resolutionRepository;
  }

  /**
   * Create new resolution for patient
   * @param {object} data
   * @returns {Promise<object>} resolution data
   */
  async createResolution(data) {
    const resolutionData = {
      ...data,
      id: uuidv1(),
    };
    const resolution = await this.resolutionRepository.createResolution(resolutionData);
    return resolution;
  }

  /**
   * Update resolution
   * @param {string} resolutionID
   * @param {string} resolution
   * @param {string} doctorID
   * @returns {Promise<string>} resolution data
   */
  async updateResolution(resolutionID, resolution, doctorID) {
    const result = await this.resolutionRepository.updateResolution(
      resolutionID,
      resolution,
      doctorID,
    );
    return result;
  }

  /**
   * Delete resolution
   * @param {string} resolutionID
   * @param {string} doctorID
   * @returns {Promise<object>} resolution ID
   */
  async deleteResolution(resolutionID, doctorID) {
    const result = await this.resolutionRepository.deleteResolution(resolutionID, doctorID);
    return result;
  }

  /**
   * Check is resolution exist
   * @param {string} appointmentID
   */
  async checkIsResolutionExist(appointmentID) {
    const result = await this.resolutionRepository.getResolutionByAppointmentID(appointmentID);
    if (result) {
      throw new ApiError('Resolution for appointment already exist', StatusCodes.BAD_REQUEST);
    }
  }

  /**
   * Check is resolution exist
   * @param {string} appointmentID
   */
  async checkIsResolutionExistByID(appointmentID) {
    const result = await this.resolutionRepository.getResolutionByID(appointmentID);
    if (!result) {
      throw new ApiError('Resolution not exist', StatusCodes.BAD_REQUEST);
    }
  }

  /**
   * Check is it your resolution exist
   * @param {string} resolutionID
   * @param {string} doctorID
   */
  async checkIsItYourResolution(resolutionID, doctorID) {
    const result = await this.resolutionRepository.getResolutionByID(resolutionID);
    if (result.doctor_id !== doctorID) {
      throw new ApiError('It not your resolution', StatusCodes.FORBIDDEN);
    }
  }

  /**
   * Get resolutions
   * @param {object} data
   * @returns {Promise<object>} resolution ID
   */
  async getResolutions(data) {
    const result = await this.resolutionRepository.getResolutions(data);
    const { total } = result[0];
    const resolutions = result.map((resolution) => {
      delete resolution.total;
      return resolution;
    });
    return {
      resolutions,
      total,
    };
  }

  /**
   * Get resolutions
   * @param {object} data
   * @returns {Promise<object>} resolution ID
   */
  async getPatientResolutionsByDoctorSpecializationID(data) {
    const result = await this.resolutionRepository.getPatientResolutionsByDoctorSpecializationID(
      data,
    );
    const { total } = result[0];
    const resolutions = result.map((resolution) => {
      delete resolution.total;
      return resolution;
    });
    return {
      resolutions,
      total,
    };
  }

  /**
   * Get resolutions
   * @param {object} data
   * @returns {Promise<object>} resolution ID
   */
  async getPatientResolutionsByDate(data) {
    const result = await this.resolutionRepository.getPatientResolutionsByDate(data);
    const { total } = result[0];
    const resolutions = result.map((resolution) => {
      delete resolution.total;
      return resolution;
    });
    return {
      resolutions,
      total,
    };
  }

  /**
   * Get my resolutions
   * @param {object} data
   * @returns {Promise<object>} resolution ID
   */
  async getMyResolutions(data) {
    const result = await this.resolutionRepository.getMyResolutions(data);
    const { total } = result[0];
    const resolutions = result.map((resolution) => {
      delete resolution.total;
      return resolution;
    });
    return {
      resolutions,
      total,
    };
  }
}

export { ResolutionService };
