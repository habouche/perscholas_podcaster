package perscholas.aws;

import java.io.File;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ListObjectsRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;


@Component
public class S3 {

	@Value("${amazon.aws.accesskey}")
	private String amazonAWSAccessKey;

	@Value("${amazon.aws.secretkey}")
	private String amazonAWSSecretKey;

	private AmazonS3 s3;

	@PostConstruct
	public void init() {
		BasicAWSCredentials cred = new BasicAWSCredentials(amazonAWSAccessKey, amazonAWSSecretKey);
		AWSStaticCredentialsProvider provider = new AWSStaticCredentialsProvider(cred);
		
		s3 = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.US_WEST_1)
                .withCredentials(provider)
                .build();
	}

	public boolean fileExists(String bucket, String imagePath) {
		if (imagePath.startsWith("/")) {
			imagePath = imagePath.substring(1);
		}

		ObjectListing objectListing = s3.listObjects(new ListObjectsRequest().withBucketName(bucket).withPrefix(imagePath));
//		for (S3ObjectSummary objectSummary : objectListing.getObjectSummaries()) {
//			System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!" + objectSummary.getKey() + "(size = " + objectSummary.getSize() + ")");
//		}

		return !objectListing.getObjectSummaries().isEmpty();
	}
	
	// 1 write the file from your multipart uplaod to the OS temp directory
	// 2 pass the file into S3

	public void writeFile(String bucketPath, String fileName, File fromFile) {
		
		PutObjectRequest req = new PutObjectRequest(bucketPath, fileName, fromFile);
		req.withCannedAcl(CannedAccessControlList.PublicRead);
		
		
		PutObjectResult por = s3.putObject(req);
		//System.out.println(por);
		
		System.out.println("File successfully written to S3 at " + bucketPath + "/" + fileName);
		
	}

}
