package com.proyecto.controller;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/")

@CrossOrigin(origins = "http://127.0.0.1:3000")
public class Controller {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@PostMapping("/subir-imagen")
	public ResponseEntity<String> subirImagen(@RequestParam("fileInput") MultipartFile file) {
		try {
			String sql = "INSERT INTO Usuarios(username, email, pswd, imagenperfil) VALUES ('mario2', 'mario2@gmail.com', '1234', ?)";
			jdbcTemplate.update(con -> {
				PreparedStatement ps = con.prepareStatement(sql);
				try {
					ps.setBytes(1, file.getBytes());
				} catch (Exception e) {
					throw new RuntimeException("Error al procesar la imagen: " + e.getMessage());
				}
				return ps;
			});

			return ResponseEntity.ok("Imagen subida con éxito");
		} catch (Exception e) {
			System.out.println("Error al subir la imagen: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al subir la imagen. Consulta la consola para más detalles.");
		}
	}

	@GetMapping("/getImages")
	public ResponseEntity<List<ImagenDTO>> getImages() {
	    try {
	        String sql = "SELECT imagenperfil FROM Usuarios";
	        List<Map<String, Object>> imagenes = jdbcTemplate.queryForList(sql);

	        // Convertir las imágenes a un formato adecuado para el frontend
	        List<ImagenDTO> imagenesDTO = convertirAImagenDTO(imagenes);

	        return ResponseEntity.ok(imagenesDTO);
	    } catch (Exception e) {
	        System.out.println("Error al obtener las imágenes: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}

	private List<ImagenDTO> convertirAImagenDTO(List<Map<String, Object>> imagenes) {
	    List<ImagenDTO> imagenesDTO = new ArrayList<>();
	    for (Map<String, Object> imagen : imagenes) {
	        byte[] bytes = (byte[]) imagen.get("imagenperfil");
	        String base64 = Base64.getEncoder().encodeToString(bytes);
	        imagenesDTO.add(new ImagenDTO(base64));
	    }
	    return imagenesDTO;
	}


	// Clase DTO para representar la información de la imagen
	private static class ImagenDTO {
		private final String imagenBase64;

		public ImagenDTO(String imagenBase64) {
			this.imagenBase64 = imagenBase64;
		}

		public String getImagenBase64() {
			return imagenBase64;
		}
	}
}
