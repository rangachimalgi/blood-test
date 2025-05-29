import { useEffect } from "react";
import axios from "axios";
import { products } from "../../utils/products"; 

const BulkUploadProducts = () => {
  useEffect(() => {
    const upload = async () => {
      for (let product of products) {
        try {
          // add type if it's not present
          const payload = { ...product, type: product.type || "product" };

          await axios.post(`${process.env.REACT_APP_API_URL}/api/tests`, payload);
          console.log("✅ Uploaded:", product.productName);
        } catch (err) {
          console.error("❌ Failed:", product.productName, err.message);
        }
      }
    };

    upload();
  }, []);

  return <div>Uploading all products... Check console logs 👀</div>;
};

export default BulkUploadProducts;
