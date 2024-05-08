// import { Box, Divider, Grid, Paper, Typography } from "@mui/material"
// import { catBoxLayout, catKPIContent, catKPIIcon, catKPIName, catKPIpaper, categories } from "./categoriesStyle"
// import { ChairTwoTone, DevicesOtherTwoTone, DryCleaningTwoTone, HealthAndSafetyTwoTone, HomeTwoTone, LocalGroceryStoreTwoTone, LocalHospitalTwoTone, RestaurantMenuTwoTone, WatchTwoTone } from "@mui/icons-material";

// interface Cat {
//     logo: any;
//     name: string;
//     amount: number;
//     count: number;
// }

// const Categories: React.FC = () => {
//     const cat: Cat[] = [
//         {
//             logo: <DryCleaningTwoTone />,
//             name: 'Clothing',
//             amount: 1000,
//             count: 5
//         },
//         {
//             logo: <DevicesOtherTwoTone />,
//             name: 'Electronics',
//             amount: 1000,
//             count: 5
//         },
//         {
//             logo: <ChairTwoTone />,
//             name: 'Furniture',
//             amount: 1000,
//             count: 5
//         },
//         {
//             logo: <RestaurantMenuTwoTone />,
//             name: 'Food',
//             amount: 1000,
//             count: 5
//         },
//         {
//             logo: <LocalGroceryStoreTwoTone />,
//             name: 'Groceries',
//             amount: 1000,
//             count: 5
//         },
//         {
//             logo: <LocalHospitalTwoTone />,
//             name: 'Health Care',
//             amount: 1000,
//             count: 5
//         },
//         {
//             logo: <HealthAndSafetyTwoTone />,
//             name: 'Insurance',
//             amount: 1000,
//             count: 5
//         },
//         {
//             logo: <WatchTwoTone />,
//             name: 'Wearables',
//             amount: 1000,
//             count: 5
//         },
//         {
//             logo: <HomeTwoTone />,
//             name: 'Households',
//             amount: 1000,
//             count: 5
//         },
//     ]

//     return (
//         <Box sx={categories}>
//             <Box sx={catBoxLayout}>
//                 <Grid container spacing={4}>
//                     {cat.map((cat) => (
//                         <Grid item xs={12} sm={4}>
//                             <Paper sx={catKPIpaper}>
//                                 <Typography sx={catKPIName}>{cat.name}</Typography>
//                                 <Divider />

//                                 <Box sx={catKPIContent}>
//                                     <Box sx={catKPIIcon}>
//                                         {cat.logo}
//                                     </Box>
//                                     <Box>
//                                         <Box>Total Expenses</Box>
//                                         <Box>{cat.amount}</Box>
//                                         <Box>No. of Items</Box>
//                                         <Box>{cat.count}</Box>
//                                     </Box>
//                                 </Box>
//                             </Paper>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>
//         </Box>
//     )
// }

// export default Categories

import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Categories() {
    const router = useNavigate()
    const [timer, setTimer] = useState(5)

    useEffect(() => {
        setTimeout(() => {
            router("/")
        }, 5000);
        // eslint-disable-next-line
    }, [])

    setInterval(() => {
        if (timer > 0) {
            setTimer(timer - 1)
        }
    }, 1000);


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <h2>Page is under construction, redirecting you to home page in {timer} sec..</h2>
        </Box>
    )
}

export default Categories;