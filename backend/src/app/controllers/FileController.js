import File from '../models/File';

class FileController {
  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({
        name,
        path,
      });

      return res.json({
        success: true,
        file,
      });
    } catch (error) {
      return res.json({
        success: false,
        message:
          'Algo deu errado ao fazer o upload de arquivo, verifique seus dados :(',
      });
    }
  }
}

export default new FileController();
