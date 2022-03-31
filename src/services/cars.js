import axios from "axios";

const dataUrl = 'https://vel.bl.is/_/items/Price?fields%5B0%5D=%2A.%2A&fields%5B1%5D=model.name&fields%5B2%5D=model.id&fields%5B3%5D=model.slug&fields%5B4%5D=model.thumbnail.data.full_url&fields%5B5%5D=model.brand.name&fields%5B6%5D=model.brand.slug&fields%5B7%5D=model.price_text&fields%5B8%5D=price&fields%5B9%5D=id&fields%5B10%5D=tech_spec.%2A.%2A&fields%5B11%5D=version.model.filter.model_filters_id&fields%5B12%5D=model.tech_spec.%2A.%2A';

export const getCars = () => axios.get(dataUrl).then(({ data }) => data);
