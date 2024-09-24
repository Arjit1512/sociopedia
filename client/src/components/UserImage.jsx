import { Box } from "@mui/material";
import { API_BASE_URL } from '../Config';

const UserImage = ({image,size = "60px"}) => {
    return (
        <Box width={size} height={size}>
            {/* profile image that you want to see for each user */}
          <img 
          style ={{objectFit:"cover", borderRadius:"50%"}}
          width={size}
          height={size}
          alt="user"
          src={`${API_BASE_URL}/assets/${image}`}
          />
        </Box>
    )
};

export default UserImage;