<template>
    <div class="filters">
        <form>
            <h5 class="c-primary fs-18 font-700">Orkugjafi</h5>
            <div class="filter-item">
                <input type="checkbox" id="electric" name="electric"
                       :value="FUEL_TYPES.ELECTRIC"
                       v-model="fuelType"
                       @change="onFiltersChange"
                >
                <label for="electric">100% Rafmagn ({{fuelResNumbers.electric}})</label>
                <span class="checkmark"></span>
            </div>
            <div class="filter-item">
                <input type="checkbox" id="plug-in-hybrid" name="plugInHybrid"
                       :value="FUEL_TYPES.PLUG_IN_HYBRID"
                       v-model="fuelType"
                       @change="onFiltersChange"
                >
                <label for="plug-in-hybrid">Plug-in Hybrid ({{fuelResNumbers.plugInHybrid}})</label>
                <span class="checkmark"></span>
            </div>
            <div class="filter-item">
                <input type="checkbox" id="hybrid" name="hybrid"
                       :value="FUEL_TYPES.HYBRID"
                       v-model="fuelType"
                       @change="onFiltersChange"
                >
                <label for="hybrid">Hybrid ({{fuelResNumbers.hybrid}})</label>
                <span class="checkmark"></span>
            </div>
        </form>
        <form>
            <h5 class="c-primary fs-18 font-700">Drif</h5>
            <div class="filter-item">
                <input type="checkbox" id="all" name="all"
                       :value="WHEELS_DRIVEN.ALL"
                       v-model="wheelsDriven"
                       @change="onFiltersChange"
                >
                <label for="all">Fjórhjóladrif ({{wheelsResNumbers.all}})</label>
                <span class="checkmark"></span>
            </div>
            <div class="filter-item">
                <input type="checkbox" id="front" name="front"
                       :value="WHEELS_DRIVEN.FRONT"
                       v-model="wheelsDriven"
                       @change="onFiltersChange"
                >
                <label for="front">Framhjóladrif ({{wheelsResNumbers.front}})</label>
                <span class="checkmark"></span>
            </div>
            <div class="filter-item">
                <input type="checkbox" id="rear" name="rear"
                       :value="WHEELS_DRIVEN.REAR"
                       v-model="wheelsDriven"
                       @change="onFiltersChange"
                >
                <label for="rear">Afturhjóladrif ({{wheelsResNumbers.rear}})</label>
                <span class="checkmark"></span>
            </div>
        </form>
    </div>
</template>

<script>
import { FUEL_TYPES, WHEELS_DRIVEN } from "@/constants/filters";

export default {
    name: 'Filters',

    props: {
        fuelResNumbers: Object,
        wheelsResNumbers: Object,
    },

    data() {
        return {
            FUEL_TYPES,
            WHEELS_DRIVEN,
            fuelType: [],
            wheelsDriven: [],
        }
    },

    methods: {
        onFiltersChange() {
            this.$emit('filters-change', { fuelType: this.fuelType, wheelsDriven: this.wheelsDriven });
        }
    },
}
</script>

<style lang="scss" scoped>
.filters {
    padding: 50px;

    h5 {
        margin: 0 0 13px;
    }

    .filter-item {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-bottom: 10px;
        position: relative;

        input {
            margin-right: 14px;
            width: 22px;
            height: 22px;
            opacity: 0;
            z-index: 22222;

            & ~ .checkmark {
                border: 0.7px solid #3BADE0;
                width: 22px;
                height: 22px;
                position: absolute;
                left: 0;
            }

            &:checked ~ .checkmark {
                background-color: #3BADE0;
                background-repeat: no-repeat;
                background-position: center;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='7' viewBox='0 0 9 7' fill='none'%3E%3Cpath d='M6.89008 0.700699C7.03095 0.566588 7.21841 0.492446 7.4129 0.493918C7.60739 0.49539 7.7937 0.57236 7.93253 0.708587C8.07135 0.844814 8.15182 1.02964 8.15696 1.22407C8.1621 1.4185 8.09151 1.60733 7.96008 1.7507L3.97008 6.7407C3.90147 6.8146 3.81866 6.8739 3.72661 6.91507C3.63456 6.95623 3.53515 6.97841 3.43433 6.98028C3.33351 6.98214 3.23335 6.96366 3.13984 6.92593C3.04632 6.8882 2.96138 6.83201 2.89008 6.7607L0.244079 4.1147C0.170393 4.04604 0.111291 3.96324 0.0702986 3.87124C0.0293066 3.77924 0.0072646 3.67992 0.00548781 3.57922C0.00371103 3.47852 0.0222359 3.37849 0.0599569 3.2851C0.0976779 3.19171 0.153823 3.10688 0.225041 3.03566C0.29626 2.96444 0.381094 2.9083 0.474482 2.87058C0.56787 2.83286 0.667899 2.81433 0.768602 2.81611C0.869305 2.81788 0.968618 2.83993 1.06062 2.88092C1.15262 2.92191 1.23542 2.98101 1.30408 3.0547L3.39808 5.1477L6.87108 0.7227C6.87733 0.715001 6.88401 0.707656 6.89108 0.700699H6.89008Z' fill='white'/%3E%3C/svg%3E");
            }
        }
    }

    form {
        margin-bottom: 30px;
    }
}
</style>
