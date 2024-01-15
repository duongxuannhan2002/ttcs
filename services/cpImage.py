import cv2
import numpy as np
import urllib.request
import sys

# def url_to_image(url):
#     resp = urllib.request.urlopen(url)
#     image = np.asarray(bytearray(resp.read()), dtype="uint8")
#     image = cv2.imdecode(image, cv2.IMREAD_COLOR)
#     return image

def compare_images(image_path1, image_url2):
    # Đọc ảnh màu từ file
    img1 = cv2.imread(image_path1, cv2.IMREAD_GRAYSCALE)

# Load the second image from a URL
    url = image_url2  # Thay thế URL của bạn ở đây
    req = urllib.request.urlopen(url)
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    img2 = cv2.imdecode(arr, -1)  # -1 đồng nghĩa với việc giữ nguyên định dạng màu

# Initialize SIFT detector
    sift = cv2.SIFT_create()

# Detect key points and compute descriptors
    keypoints1, descriptors1 = sift.detectAndCompute(img1, None)
    keypoints2, descriptors2 = sift.detectAndCompute(img2, None)

# Initialize the Brute-Force Matcher
    bf = cv2.BFMatcher()

# Match descriptors
    matches = bf.knnMatch(descriptors1, descriptors2, k=2)

# Apply ratio test
    good_matches = []
    for m, n in matches:
        if m.distance < 0.75 * n.distance:
            good_matches.append(m)

# Print the number of good matches
    # print(f"Number of good matches: {len(good_matches)}")
    point = len(good_matches)

    sys.stdout.write(str(point))

if __name__ == "__main__":
    # Lấy đường dẫn ảnh từ tham số dòng lệnh
    image_path1 = sys.argv[1]
    # image_path1 = "D:/hoc/ttcs/public/image/image1.jpg"
    image_path2 = sys.argv[2]

    # Gọi hàm so sánh ảnh
    compare_images(image_path1, image_path2)

# Thay đổi các đường dẫn và URL của ảnh theo yêu cầu của bạn
# image_path1 = './image2.jpg'
# image_url2 = 'https://firebasestorage.googleapis.com/v0/b/ttcs-7bc51.appspot.com/o/images%2F1702198006880.jpg?alt=media&token=afd0371e-f7fb-4912-b301-cb829d7ca663'
# compare_images(image_path1, image_url2)