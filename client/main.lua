local QBCore = exports['qb-core']:GetCoreObject()
local isScoreboardOpen = false

-- Function to open the scoreboard
local function OpenScoreboard()
    if not isScoreboardOpen then
        isScoreboardOpen = true
        TriggerServerEvent("scoreboard:getPlayerCount")
        SendNUIMessage({
            action = "openScoreboard"
        })
        SetNuiFocus(false, false)
    end
end

-- Function to close the scoreboard
local function CloseScoreboard()
    if isScoreboardOpen then
        isScoreboardOpen = false
        SendNUIMessage({
            action = "closeScoreboard"
        })
        SetNuiFocus(false, false)
    end
end

-- Handle Home button press and release
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if IsControlPressed(0, 212) then -- 212 is the control code for the Home key
            OpenScoreboard()
        elseif IsControlJustReleased(0, 212) then
            CloseScoreboard()
        end
    end
end)

-- Update player count every 5 seconds when scoreboard is open
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(5000)
        if isScoreboardOpen then
            TriggerServerEvent("scoreboard:getPlayerCount")
        end
    end
end)

-- Receive updated player count from server
RegisterNetEvent("scoreboard:updatePlayerCount")
AddEventHandler("scoreboard:updatePlayerCount", function(count)
    SendNUIMessage({
        action = "updatePlayerCount",
        playerCount = count,
        maxPlayers = 128
    })
end)

