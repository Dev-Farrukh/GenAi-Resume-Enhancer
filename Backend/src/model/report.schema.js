import mongoose from 'mongoose';

/**
 * Report Schema
 * Payload
 * Resume Text { type: String }
 * Job Descripition Text { type: String }
 * 
 * Response 
 * Behavioral Questions { type: Array} 
 * Technical Questions { type: Array {}
 * Skill Gaps { type: Array }
 * Overall Score { type: Number }
 * Preperation Plan { type: String }
 
*/

const BehavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Behavioral question is required']
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, { _id: false });

const TechnicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Technical question is required']
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, { _id: false });

const SkillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, 'Skill is required']
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Severity is required']
    }

}, { _id: false });

const PreparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, 'Days of preparation is required']
    },
    focus: {
        type: String,
        required: [true, 'Focus is required']
    },
    tasks: {
        type: [String],
        required: [true, 'Practice tasks are required']
    }

}, { _id: false });

const reportSchema = new mongoose.Schema({
    resumeText: {
        type: String,
        required: true
    },

    jobDescriptionText: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    matchScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    behavioralQuestions: [BehavioralQuestionSchema],

    technicalQuestions: [TechnicalQuestionSchema],

    skillGaps: [SkillGapSchema],

    preparationPlan: [PreparationPlanSchema]

}, { timestamps: true });

const reportModel = mongoose.model('Report', reportSchema);
export default reportModel;