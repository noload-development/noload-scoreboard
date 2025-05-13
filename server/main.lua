local QBCore = exports['qb-core']:GetCoreObject()

-- Function to get current player count
local function GetPlayerCount()
    return #QBCore.Functions.GetPlayers()
end

-- Send player count to client
RegisterServerEvent("scoreboard:getPlayerCount")
AddEventHandler("scoreboard:getPlayerCount", function()
    local playerCount = GetPlayerCount()
    TriggerClientEvent("scoreboard:updatePlayerCount", source, playerCount)
end)

