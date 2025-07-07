/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import PlanButton from '../../common/buttons/PlanButton';
import Package from '../../../assets/images/landing/package.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';


const SectionFive = () => {
  const [billing, setBilling] = useState('monthly');

  const [swiperReady, setSwiperReady] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const plans = useSelector(state => state.plan.plans)

  return (
    <section className="py md:py-10 px-2 lg:px-16 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-[40px] font-bold">Choose your Plan</h2>
        <p className="text-gray-600 mt-2">Flexible pricing tailored to your restaurant’s needs.</p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="w-[15rem] bg-gray-200 rounded-lg flex p-0.5 shadow-lg shadow-gray-300">
          <button
            className={`flex-1 py-1 text-sm rounded-lg transition-all duration-300 ${billing === 'monthly' ? 'bg-white text-textSecondary' : 'text-textSecondary'}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            className={`flex-1 py-1 text-sm rounded-lg transition-all duration-300 ${billing === 'annual' ? 'bg-white text-textSecondary' : ' text-textSecondary'}`}
            onClick={() => setBilling('annual')}
          >
            Annual
            <span className="text-[10px] text-primary"> (save 20%)</span>
          </button>
        </div>
      </div>

      {/* Mobile: Swiper Slider */}
      <div className="relative md:hidden w-full">
        <ChevronLeft
          ref={prevRef}
          className="absolute w-6 h-6 top-1/2 -left-8 transform -translate-y-1/2 z-50 bg-gray-100 text-textPrimary text-xl p-1 rounded-full"
        >
        </ChevronLeft>
        <ChevronRight
          ref={nextRef}
          className="absolute w-6 h-6 top-1/2 -right-8 transform -translate-y-1/2 z-50 bg-gray-100 text-textPrimary text-xl p-1 rounded-full"
        >
        </ChevronRight>

        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            if (prevRef.current && nextRef.current) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          onSwiper={() => setSwiperReady(true)}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          {plans?.map((plan, index) => (
            <SwiperSlide key={plan.id}>
              <PlanCard plan={plan} billing={billing} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      {/* Tablet: Column layout */}
      <div className="hidden md:flex lg:hidden flex-col gap-6">
        {plans?.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} index={index} />
        ))}
      </div>

      {/* Laptop & Desktop: 3 Column Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {plans?.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} index={index} />
        ))}
      </div>
    </section>
  );
};

const PlanCard = ({ plan, billing, index }) => (
  <motion.div
    className="relative bg-white rounded-xl shadow-lg p-2 lg:hover:-translate-y-4 duration-300 lg:hover:shadow-primary flex flex-col md:flex-row lg:flex-col md:items-center border border-gray-200"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 * index }}
  >

    {/* Left Section */}
    <div className="flex-1 md:w-1/2 lg:w-full lg:pt-5">
      <div className="flex justify-between mb-4 w-full">
        <div className='w-4/5 pt-5 pl-5'>
          <h3 className="text-2xl font-semibold text-left text-textPrimary">{plan.planName}</h3>
          <p className="text-xs text-justify lg:text-sm text-textSecondary mt-1">{plan.description}</p>
        </div>

      </div>
      <div className="text-2xl text-left pl-5 font-bold text-textPrimary mb-4">${billing === "monthly" ? plan.pricePerMonth : plan.pricePerYear}</div>
      <PlanButton>Choose Plan</PlanButton>
    </div>

    {/* Right Section */}
    <div className="mt-2 md:mt-6 md:ml-6 lg:ml-0 lg:mt-6 md:border-t-0 md:border-l-gray-300 md:border-l lg:border-none pt-6 md:pl-6 lg:pl-0 lg:pt-3 md:w-1/2 lg:w-full md:pb-5">
      <p className="text-sm text-gray-600 mb-3">What’s included:</p>
      <ul className="space-y-2 pl-5">
        {plan.access?.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-xs text-gray-700">
            <CheckCircle className="w-5 h-5 text-textPrimary" /> {feature}
          </li>
        ))}
      </ul>
    </div>

    <div className='absolute top-3 right-3'>
      <img src={Package} alt="" className='h-15 w-15' />
    </div>
  </motion.div>
);

export default SectionFive;
