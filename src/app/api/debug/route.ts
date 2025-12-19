import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getJobData } from '@/lib/cms';

export async function GET() {
    const cwd = process.cwd();
    const jobsDir = path.join(cwd, 'content', 'jobs');

    let files = [];
    try {
        files = fs.readdirSync(jobsDir);
    } catch (e: any) {
        files = ["Error: " + e.message];
    }

    const testSlug = "servicemonteur-taegerwilen";
    const jobData = getJobData(testSlug);

    return NextResponse.json({
        cwd,
        jobsDir,
        filesExists: fs.existsSync(jobsDir),
        files,
        testJob: {
            slug: testSlug,
            data: jobData
        }
    });
}
