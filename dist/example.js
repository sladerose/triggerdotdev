"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstScheduledTask = void 0;
const v3_1 = require("@trigger.dev/sdk/v3");
exports.firstScheduledTask = v3_1.schedules.task({
    id: "first-scheduled-task",
    // Every hour
    cron: "0 * * * *",
    // Set an optional maxDuration to prevent tasks from running indefinitely
    maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
    run: async (payload, { ctx }) => {
        // The payload contains the last run timestamp that you can use to check if this is the first run
        // And calculate the time since the last run
        const distanceInMs = payload.timestamp.getTime() - (payload.lastTimestamp ?? new Date()).getTime();
        v3_1.logger.log("First scheduled tasks", { payload, distanceInMs });
        // Wait for 5 seconds
        await v3_1.wait.for({ seconds: 5 });
        // Format the timestamp using the timezone from the payload
        const formatted = payload.timestamp.toLocaleString("en-US", {
            timeZone: payload.timezone,
        });
        v3_1.logger.log(formatted);
    },
});
