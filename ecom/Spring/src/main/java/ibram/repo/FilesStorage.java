package ibram.repo;
import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
public interface FilesStorage {
    public void init();
    public void save(MultipartFile file);
    public void deleteAll();

}