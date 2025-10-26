import { getRandomInterviewCover } from '@/lib/utils';
import dayjs from 'dayjs'
import { Calendar, StarOff } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';

const MODULE_NOW = Date.now();

const InterviewCard = ({ interviewId, type, role, userId, techstack, createdAt }: InterviewCardProps) => {

    const feedback = null as Feedback | null;
    const normalizeType = /mix/gi.test(type) ? 'Mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || MODULE_NOW).format('MMM D, YYYY');

    return (
        <div className='card-border w-[360px] max-sm:w-full min-h-96'>
            <div className="card-interview">
                <div className='flex flex-col'>
                    <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                        <div className="badge-text">{normalizeType}</div>
                    </div>

                    <Image src={getRandomInterviewCover()} alt='' width={90} height={90} className='rounded-full object-fit size-90px]' />

                    <h4 className='mt-5 capitalize'> {role} Interview </h4>

                    <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center gap-2">
                            <Image src="/calendar.svg" alt='Calendar' width={22} height={22} />
                            <p className='text-sm text-light-100'>{formattedDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src="/star.svg" alt='Rating Star' width={22} height={22} />
                            <p className='text-sm text-light-100'> {feedback?.totalScore || '----'} / 100 </p>
                        </div>
                    </div>

                    <div className="line-clamp-2 mt-5">
                        { feedback?.finalAssessment || "You haven't given any interview yet. Take it now to improve your Interview Skills"}
                    </div>

                    <div className="flex justify-between items-center mt-5">
                        <DisplayTechIcons techStack={techstack} />

                        <Button>
                            <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>{ feedback ? 'Check Feedback' : 'View Interview' }</Link>
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InterviewCard