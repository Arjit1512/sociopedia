import { Box } from "@mui/material";

const UserImage = ({image,size = "60px"}) => {
    return (
        <Box width={size} height={size}>
            {/* profile image that you want to see for each user */}
          <img 
          style ={{objectFit:"cover", borderRadius:"50%"}}
          width={size}
          height={size}
          alt="user"
          src={`http://localhost:3001/assets/${image}`}
          />
        </Box>
    )
};

export default UserImage;