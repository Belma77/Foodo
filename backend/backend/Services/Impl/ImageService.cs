using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Net.Http.Headers;

namespace backend.Services.Impl
{
    public class ImageService:IImageService
    {
        public string saveImage(IFormFile file)
        {
            try
            {
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    var formatedPath = dbPath.Replace(" ", "").Replace("\\", "/");
                    return formatedPath;
                }
                else
                {
                    // handle this better
                    throw new Exception();
                }
            } catch (Exception ex)
            {
                throw new Exception();
            }
        }

    }
}
