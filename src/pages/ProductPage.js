import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Grid, Image, Heading, Text, Button, Flex } from "@chakra-ui/react";

import { ShopContext } from "../context/shopContext";

const ProductPage = () => {
	const { handle } = useParams();

	const { fetchProductWithHandle, addItemtoCheckout, product } =
		useContext(ShopContext);

	useEffect(() => {
		fetchProductWithHandle(handle);
	}, [fetchProductWithHandle, handle]);

	if (!product.title) return <div>Loading...</div>;
	return (
		<Box p="2rem">
			<Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} m="auto">
				<Flex>
					<Image src={product.images[0].src} />
				</Flex>
				<Box>
					<Flex
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						px="2rem">
						<Heading pb="2rem">{product.title}</Heading>
						<Text fontWeight="bold" pb="2rem">{product.variants[0].price}</Text>
						<Text color="gray.500" pb="2rem">{product.description}</Text>
						<Button
							onClick={() =>
								addItemtoCheckout(product.variants[0].id, 1)
							}
                            _hover={{ opacity: '70%'}}
                            w="10rem" backgroundColor="#FF38BD" color="white">
							Add To Cart
						</Button>
					</Flex>
				</Box>
			</Grid>
		</Box>
	);
};

export default ProductPage;
