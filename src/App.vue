<template>
    <div class="app">
        <Filters
            @filters-change="filterCars"
            :fuel-res-numbers="fuelResNumbers"
            :wheels-res-numbers="wheelsResNumbers"
        />
        <div class="cars-container">
            <CarCard
                v-for="car of filteredCars"
                :key="car.id"
                :car-details="car"
            />
            <img
                src="./assets/spinner.gif"
                alt="loading"
                class="spinner"
                v-if="!resSuccess"
            >
        </div>
    </div>
</template>

<script>
import Filters from "@/components/Filters";
import CarCard from "@/components/CarCard";
import { FUEL_TYPES, WHEELS_DRIVEN, FILTERS_KEYS } from "@/constants/filters";
import { getCars } from "@/services/cars";

export default {
    name: 'App',

    components: {
        CarCard,
        Filters,
    },

    data() {
        return {
            cars: [],
            filteredCars: [],
            fuelResNumbers: {},
            wheelsResNumbers: {},
            resSuccess: false,
        }
    },

    methods: {
        getAllCars() {
            getCars().then(({ data }) => {
                this.cars = data;
                this.filteredCars = data;
                this.groupFuelResNumbers(data);
                this.groupWheelsResNumbers(data);
                this.resSuccess = true;
            })
        },

        calcFilterResNumber(filterByKey, name, cars) {
            return cars.filter(car => {
                const techSpec = car.model ? car.model.tech_spec : [car.tech_spec];
                return techSpec.some(eachModel => eachModel[filterByKey].name.toLowerCase().includes(name));
            }).length;
        },

        groupFuelResNumbers(cars) {
            const key = FILTERS_KEYS.FUEL_TYPE_KEY;

            this.fuelResNumbers = {
                electric: this.calcFilterResNumber(key, FUEL_TYPES.ELECTRIC, cars),
                plugInHybrid: this.calcFilterResNumber(key, FUEL_TYPES.PLUG_IN_HYBRID, cars),
                hybrid: this.calcFilterResNumber(key, FUEL_TYPES.HYBRID, cars),
            };
        },

        groupWheelsResNumbers(cars) {
            const key = FILTERS_KEYS.WHEELS_DRIVEN_KEY;

            this.wheelsResNumbers = {
                all: this.calcFilterResNumber(key, WHEELS_DRIVEN.ALL, cars),
                front: this.calcFilterResNumber(key, WHEELS_DRIVEN.FRONT, cars),
                rear: this.calcFilterResNumber(key, WHEELS_DRIVEN.REAR, cars),
            };
        },

        filterCars(filtersGroups) {
            const filteredByFuelTypes = this.filterBy(FILTERS_KEYS.FUEL_TYPE_KEY, filtersGroups.fuelType, this.cars);
            const filteredByWheelsDriven = this.filterBy(FILTERS_KEYS.WHEELS_DRIVEN_KEY, filtersGroups.wheelsDriven, this.cars);
            this.groupFuelResNumbers(filteredByWheelsDriven);
            this.groupWheelsResNumbers(filteredByFuelTypes);

            this.filteredCars = this.filterBy(FILTERS_KEYS.WHEELS_DRIVEN_KEY, filtersGroups.wheelsDriven, filteredByFuelTypes);
        },

        filterBy(byKey, filterGroup, cars) {
            return !filterGroup.length ? cars : cars.filter(car => {
                const techSpec = car.model ? car.model.tech_spec : [car.tech_spec];
                return techSpec.some(eachModel => filterGroup.some(item => eachModel[byKey].name.toLowerCase().includes(item)));
            });
        },
    },

    mounted() {
        this.getAllCars();
    }
}
</script>

<style lang="scss">
@font-face {
    font-family: "TT-Norms";
    src: local("TT-Norms"),
    url(./assets/fonts/TT-Norms/TTNorms-Regular.otf) format("truetype");
}

.app {
    display: flex;
    color: #636363;
    height: 100vh;
    font-family: TT-Norms, sans-serif;

    .c-primary {
        color: #103483;
    }

    .font-700 {
        font-weight: 700;
    }

    .fs-14 {
        font-size: 14px;
    }
    .fs-16 {
        font-size: 16px;
    }
    .fs-18 {
        font-size: 18px;
    }

    .cars-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 50px 70px 50px 4px;
        width: 80%;
        background-color: #F7F7F7;
        max-height: calc(100vh - 100px);
        overflow: auto;
        position: relative;

        .spinner {
            position: absolute;
            left: calc(50% - 52px);
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .filters {
        width: 20%;
    }
    
    @media (max-width: 767px) {
        .cars-container {
            padding: 50px 4px;
        }
    }

    @media (max-width: 575px) {
        & {
            display: block;
        }

        .cars-container {
            padding: 50px 4px;
            max-height: none;
            width: auto;

            .spinner {
                left: 50%;
            }
        }

        .filters {
            width: auto;
        }
    }
}
</style>
