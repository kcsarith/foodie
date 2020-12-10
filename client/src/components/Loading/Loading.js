import React from 'react';
import './Loading.css';
import { motion } from 'framer-motion';

const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.1
        }
    },
    end: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const loadingCircleVariants = {
    start: {
        y: '0%'
    },
    end: {
        y: '100%'
    }
};

const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeInOut'
}


const Loading = () => {

    return (
        <motion.div className='loading-container' variants={loadingContainerVariants} initial='start' animate='end'>
            <motion.span className='loading-circle' variants={loadingCircleVariants} transition={loadingCircleTransition} />
            <motion.span className='loading-circle' variants={loadingCircleVariants} transition={loadingCircleTransition} />
            <motion.span className='loading-circle' variants={loadingCircleVariants} transition={loadingCircleTransition} />
        </motion.div>
    )

}

export default Loading
