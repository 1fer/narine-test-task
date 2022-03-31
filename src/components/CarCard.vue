<template>
    <div class="card">
        <div class="fuel">
            <span v-if="fuelTypes.electric" class="rafmagn">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                        <path d="M19.5136 15.5727C17.0252 15.1749 16.8378 14.795 16.8378 14.795C17.3491 11.5833 15.764 7.51663 13.1677 5.31413C9.71918 2.38735 4.46973 4.51268 0.384927 0.0601786C-0.569519 -0.978738 -0.0127588 11.7139 5.10034 16.5226C8.83859 20.0371 13.2415 18.9566 14.4516 18.3807C15.5481 17.8583 16.3151 16.9025 16.3151 16.9025C18.3092 17.5437 19.2977 17.508 19.2977 17.508C19.9965 17.5971 20.3488 15.7033 19.5136 15.5727ZM14.9573 15.7864C8.40682 13.762 3.48119 6.65582 3.48119 6.65582C3.48119 6.65582 7.80461 11.9869 15.4231 14.5813C15.4345 14.985 15.2072 15.5608 14.9573 15.7864Z" fill="#2FCD2F"/>
                    </svg>
                    {{fuelTypes.electric.fuel_type.display_name}}
                </span>
                <span class="badge">Væntanlegur</span>
            </span>
            <span v-if="fuelTypes.plugInHybrid" :class="{ 'with-neighbour': fuelTypes.hybrid }">
                {{fuelTypes.plugInHybrid.fuel_type.display_name}}
            </span>
            <span v-if="fuelTypes.hybrid">{{fuelTypes.hybrid.fuel_type.display_name}}</span>
        </div>
        <img :src="carDetails.model?.thumbnail.data.full_url" alt="" class="car-img">
        <h4 class="c-primary font-700">{{carDetails.brand?.name}}</h4>
        <div class="parameters">
            <div class="param-item">
                Verð frá:
                <div class="c-primary value"><span class="fs-16 font-700">{{carDetails.price}}</span> kr.</div>
            </div>
            <div class="param-item" v-if="!fuelTypes.plugInHybrid && carDetails.tech_spec?.range">
                Drægni
                <div class="c-primary value"><span class="fs-16 font-700">{{carDetails.tech_spec.range}}</span> km</div>
            </div>
            <div class="param-item" v-if="carDetails.tech_spec?.fuel_consumption_combined">
                Eyðsla frá
                <div class="c-primary value"><span class="fs-16 font-700">{{carDetails.tech_spec?.fuel_consumption_combined}}</span> l/100km</div>
            </div>
            <div class="param-item" v-if="carDetails.tech_spec?.battery_size">
                Rafhlaða
                <div class="c-primary value"><span class="fs-16 font-700">{{carDetails.tech_spec?.battery_size}}</span> kWh</div>
            </div>
        </div>
    </div>
</template>

<script>
import { FUEL_TYPES } from "@/constants/filters";

export default {
    name: 'CarCard',

    props: {
        carDetails: {
            type: Object,
            default: () => ({}),
        }
    },

    computed: {
        fuelTypes() {
            const techSpec = this.carDetails.model ? this.carDetails.model.tech_spec : [this.carDetails.tech_spec];

            return {
                plugInHybrid: techSpec.find(spec => spec.fuel_type.name.toLowerCase().includes(FUEL_TYPES.PLUG_IN_HYBRID)),
                electric: techSpec.find(spec => spec.fuel_type.name.toLowerCase().includes(FUEL_TYPES.ELECTRIC)),
                hybrid: techSpec.find(spec => spec.fuel_type.name.toLowerCase().includes(FUEL_TYPES.HYBRID)),
            }
        }
    }
}
</script>

<style lang="scss">
.card {
    padding: 10px 10px 23px;
    background-color: #ffffff;
    margin: 12px;

    .car-img {
        height: 128px;
        width: 284px;
        object-fit: contain;
    }

    .parameters {
        display: flex;
        font-size: 13px;

        .param-item:not(:last-child) {
            margin-right: 14px;
        }

        .value {
            margin-top: 2px;
        }
    }

    h4 {
        margin-bottom: 3px;
    }

    .fuel {
        margin-bottom: 15px;
        font-size: 16px;
        min-height: 23px;

        span.with-neighbour {
            padding-right: 22px;
            position: relative;

            &:after {
                content: '';
                width: 6px;
                height: 6px;
                border-radius: 50px;
                background-color: #c4c4c4;
                position: absolute;
                right: 7px;
                top: 7px;
            }
        }

        .rafmagn {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .badge {
                font-size: 12px;
                font-weight: 700;
                background-color: #3BADE0;
                padding: 4px;
                color: #ffffff;
            }

            svg {
                margin-right: 3px;
            }
        }
    }
}
</style>
