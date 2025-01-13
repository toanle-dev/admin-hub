import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  /**
   * Faz o upload de uma imagem para o Cloudinary
   * @param path Diretório do arquivo a ser enviado
   * @param folder Diretório do arquivo no Cloudinary
   * @returns Resposta do Cloudinary
   */
  async uploadImage(
    path: string,
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(
        path,
        {
          folder: folder,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );
    });
  }

  /**
   * Faz o download de uma imagem do Cloudinary
   * @param publicId ID público da imagem no Cloudinary
   * @returns Buffer contendo os dados da imagem
   */
  async downloadImage(publicId: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      // Gera a URL da imagem no Cloudinary
      const imageUrl = v2.url(publicId, {
        resource_type: 'image',
      });

      // Faz a requisição para obter os bytes da imagem
      const https = require('https');

      https.get(imageUrl, (response) => {
        const data: Uint8Array[] = [];
        response.on('data', (chunk) => data.push(chunk));
        response.on('end', () => resolve(Buffer.concat(data)));
        response.on('error', (error) => reject(error));
      });
    });
  }
}
