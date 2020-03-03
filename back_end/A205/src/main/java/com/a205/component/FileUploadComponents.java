package com.a205.component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.a205.service.FileUploadDownloadService;
import com.file.payload.FileUploadResponse;

@CrossOrigin(origins = "*")
@RestController
public class FileUploadComponents {
	private static final Logger logger = LoggerFactory.getLogger(FileUploadComponents.class);

	@Autowired
	private FileUploadDownloadService	 service;

	// @PostMapping("/uploadFile") //단일 파일 업로드
	public FileUploadResponse uploadFile(@RequestParam("file") MultipartFile file, int p_id) {

		String storedFileName = service.storeFile(file, p_id);

		//String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
				.path(storedFileName).toUriString();

		return new FileUploadResponse(file.getOriginalFilename(), fileDownloadUri, file.getContentType(),
				file.getSize());
	}
	
	public FileUploadResponse uploadProfile(@RequestParam("file") MultipartFile file, int m_id) {

		String storedFileName = service.storeProfile(file, m_id);

		//String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
				.path(storedFileName).toUriString();

		return new FileUploadResponse(file.getOriginalFilename(), fileDownloadUri, file.getContentType(),
				file.getSize());
	}

	////@PostMapping("/uploadMultipleFiles") // 다중 파일 업로드
	public List<FileUploadResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, int p_id) {
		return Arrays.asList(files).stream().map(file -> uploadFile(file, p_id)).collect(Collectors.toList());
	}

	// @GetMapping("/downloadFile/{fileName:.+}") // 다운로드
//	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
//		// Load file as Resource
//		Resource resource = service.loadFileAsResource(fileName);
//
//		// Try to determine file's content type
//		String contentType = null;
//		try {
//			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
//		} catch (IOException ex) {
//			logger.info("Could not determine file type.");
//		}
//
//		// Fallback to the default content type if type could not be determined
//		if (contentType == null) {
//			contentType = "application/octet-stream";
//		}
//
//		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
//				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//				.body(resource);
//	}
	
		// 이 아래로 포스트에 해당하는 파일의 경로들을 받아옴
		public List<String> getMultipleFiles(int p_id) {
			return service.getUploadFile(p_id);
		}
		
		public String getProfile(int m_id) {
			return service.getProfile(m_id);
		}
		public void deleteProfile(int m_id) {
			service.deleteProfile(m_id);
		}

}
