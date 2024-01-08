import cv2
import numpy as np
import urllib.request
import sys

def url_to_image(url):
    resp = urllib.request.urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    return image

def compare_images(image_path1, image_url2):
    # Đọc ảnh màu từ file
    img1 = cv2.imread(image_path1)
    
    # Tải ảnh trực tuyến từ URL
    img2 = url_to_image(image_url2)

    # Chuyển đổi ảnh sang ảnh xám
    gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

    # Khởi tạo bộ trích xuất đặc trưng SIFT
    sift = cv2.SIFT_create()

    # Tìm key points và descriptors với SIFT
    kp1, des1 = sift.detectAndCompute(gray1, None)
    kp2, des2 = sift.detectAndCompute(gray2, None)

    # Sử dụng BFMatcher để so sánh descriptors
    bf = cv2.BFMatcher()
    matches = bf.knnMatch(des1, des2, k=2)

    # Lọc kết quả sử dụng ratio test
    good_matches = []
    for m, n in matches:
        if m.distance < 0.75 * n.distance:
            good_matches.append(m)

    # Vẽ các matches trên ảnh
    img_matches = cv2.drawMatches(img1, kp1, img2, kp2, good_matches, None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)

    # Hiển thị ảnh với các matches

    # Tính tỉ lệ matches giữa hai ảnh
    match_ratio = len(good_matches) / min(len(kp1), len(kp2))
    sys.stdout.write(str(match_ratio))

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